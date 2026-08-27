using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

namespace TajMahalAR
{
    /// <summary>
    /// Core AR placement state machine for the Taj Mahal AR experience.
    /// Handles tap-to-place, anchor creation, model lifecycle, and Reset.
    /// Self-wires all references on Awake if not assigned in Inspector.
    /// </summary>
    public class TajMahalARPlacementController : MonoBehaviour
    {
        // ─────────────── Public State ───────────────

        public enum PlacementState
        {
            Searching,      // No plane detected yet
            PlaneFound,     // Plane detected, waiting for tap
            ReadyToPlace,   // Raycast hit is available this frame
            Placed,         // Model is placed and anchored
            Editing,        // User is manipulating the placed model
            Resetting       // Tear-down in progress
        }

        public PlacementState CurrentState { get; private set; } = PlacementState.Searching;

        /// <summary>Fired whenever the placement state changes.</summary>
        public System.Action<PlacementState> OnStateChanged;

        /// <summary>The currently placed Taj Mahal root, or null if not placed.</summary>
        public Transform PlacedModel { get; private set; }

        // ─────────────── Inspector Fields ───────────────

        [Header("AR References")]
        [SerializeField, Tooltip("ARRaycastManager on XR Origin.")]
        private ARRaycastManager m_RaycastManager;

        [SerializeField, Tooltip("ARPlaneManager on XR Origin.")]
        private ARPlaneManager m_PlaneManager;

        [SerializeField, Tooltip("ARAnchorManager on XR Origin.")]
        private ARAnchorManager m_AnchorManager;

        [Header("Prefab")]
        [SerializeField, Tooltip("TajMahalARRoot prefab to instantiate on placement.")]
        private GameObject m_TajMahalPrefab;

        [Header("Scale Settings")]
        [SerializeField, Tooltip("Default uniform scale applied on first placement.")]
        private float m_DefaultScale = 0.05f;

        [SerializeField, Tooltip("Minimum allowed uniform scale.")]
        private float m_MinScale = 0.005f;

        [SerializeField, Tooltip("Maximum allowed uniform scale.")]
        private float m_MaxScale = 0.5f;

        [Header("Placement Filter")]
        [SerializeField, Tooltip("Only allow placement on HorizontalUp planes.")]
        private bool m_RequireHorizontalUp = true;

        // ─────────────── Private State ───────────────

        private readonly List<ARRaycastHit> m_Hits = new List<ARRaycastHit>();
        private ARAnchor m_CurrentAnchor;
        private GameObject m_CurrentInstance;
        private Vector3 m_CurrentHitPoint;
        private Quaternion m_CurrentHitRotation;
        private bool m_HasValidHit;
        private Camera m_ARCamera;

        // ─────────────── Public Properties ───────────────

        public float DefaultScale => m_DefaultScale;
        public float MinScale => m_MinScale;
        public float MaxScale => m_MaxScale;
        public bool HasValidHit => m_HasValidHit;
        public Vector3 CurrentHitPoint => m_CurrentHitPoint;

        // ─────────────── Lifecycle ───────────────

        void Awake()
        {
            AutoWireReferences();
        }

        public void AutoWireReferences()
        {
            if (m_RaycastManager == null)
                m_RaycastManager = FindFirstObjectByType<ARRaycastManager>();
            if (m_PlaneManager == null)
                m_PlaneManager = FindFirstObjectByType<ARPlaneManager>();
            if (m_AnchorManager == null)
            {
                m_AnchorManager = FindFirstObjectByType<ARAnchorManager>();
                if (m_AnchorManager == null && m_RaycastManager != null)
                {
                    // Add ARAnchorManager to XR Origin if missing
                    m_AnchorManager = m_RaycastManager.gameObject.AddComponent<ARAnchorManager>();
                }
            }

            if (m_TajMahalPrefab == null)
            {
                m_TajMahalPrefab = Resources.Load<GameObject>("TajMahalARRoot");
            }

            if (m_ARCamera == null)
                m_ARCamera = Camera.main;
        }

        void Start()
        {
            AutoWireReferences();
            ValidateReferences();
            SetState(PlacementState.Searching);
        }

        void Update()
        {
            if (CurrentState == PlacementState.Placed || CurrentState == PlacementState.Editing)
                return; // Model is placed; don't process placement raycasts

            UpdateRaycastHit();
            UpdateStateFromPlaneDetection();
            HandleTapInput();
        }

        // ─────────────── Core Logic ───────────────

        /// <summary>
        /// Casts an AR ray from the screen centre to find a horizontal plane.
        /// </summary>
        private void UpdateRaycastHit()
        {
            if (m_RaycastManager == null)
            {
                m_RaycastManager = FindFirstObjectByType<ARRaycastManager>();
                if (m_RaycastManager == null) return;
            }

            Vector2 screenCentre = new Vector2(Screen.width * 0.5f, Screen.height * 0.5f);
            m_HasValidHit = m_RaycastManager.Raycast(
                screenCentre,
                m_Hits,
                TrackableType.PlaneWithinPolygon);

            if (m_HasValidHit && m_RequireHorizontalUp)
            {
                m_HasValidHit = false;
                foreach (var hit in m_Hits)
                {
                    if (hit.trackable is ARPlane plane &&
                        plane.alignment == PlaneAlignment.HorizontalUp)
                    {
                        m_CurrentHitPoint = hit.pose.position;
                        m_CurrentHitRotation = hit.pose.rotation;
                        m_HasValidHit = true;
                        break;
                    }
                }
            }
            else if (m_HasValidHit && m_Hits.Count > 0)
            {
                m_CurrentHitPoint = m_Hits[0].pose.position;
                m_CurrentHitRotation = m_Hits[0].pose.rotation;
            }
        }

        private void UpdateStateFromPlaneDetection()
        {
            if (CurrentState == PlacementState.Searching && m_HasValidHit)
                SetState(PlacementState.PlaneFound);
            else if (CurrentState == PlacementState.PlaneFound && !m_HasValidHit)
                SetState(PlacementState.Searching);
        }

        private void HandleTapInput()
        {
            // Touch input on mobile
            if (Input.touchCount == 1 && Input.GetTouch(0).phase == TouchPhase.Began)
            {
                // Don't place if tapping over UI buttons
                if (UnityEngine.EventSystems.EventSystem.current != null &&
                    UnityEngine.EventSystems.EventSystem.current.IsPointerOverGameObject(Input.GetTouch(0).fingerId))
                    return;

                TryPlace(Input.GetTouch(0).position);
            }
#if UNITY_EDITOR
            // Mouse click for editor testing
            else if (Input.GetMouseButtonDown(0))
            {
                if (UnityEngine.EventSystems.EventSystem.current != null &&
                    UnityEngine.EventSystems.EventSystem.current.IsPointerOverGameObject())
                    return;

                TryPlace(Input.mousePosition);
            }
#endif
        }

        private void TryPlace(Vector2 screenPos)
        {
            if (m_RaycastManager == null)
                m_RaycastManager = FindFirstObjectByType<ARRaycastManager>();
            if (m_TajMahalPrefab == null)
                m_TajMahalPrefab = Resources.Load<GameObject>("TajMahalARRoot");

            if (m_RaycastManager == null || m_TajMahalPrefab == null) return;

            var hits = new List<ARRaycastHit>();
            bool didHit = m_RaycastManager.Raycast(screenPos, hits, TrackableType.PlaneWithinPolygon);
            if (!didHit) return;

            ARRaycastHit? validHit = null;
            foreach (var h in hits)
            {
                if (!m_RequireHorizontalUp)
                {
                    validHit = h;
                    break;
                }
                if (h.trackable is ARPlane plane && plane.alignment == PlaneAlignment.HorizontalUp)
                {
                    validHit = h;
                    break;
                }
            }

            if (!validHit.HasValue) return;

            PlaceModelAt(validHit.Value);
        }

        private void PlaceModelAt(ARRaycastHit hit)
        {
            DestroyCurrentInstance();

            Pose hitPose = hit.pose;

            if (m_ARCamera == null) m_ARCamera = Camera.main;
            Vector3 cameraForward = m_ARCamera != null
                ? m_ARCamera.transform.forward
                : Vector3.forward;
            cameraForward.y = 0;
            cameraForward.Normalize();
            if (cameraForward == Vector3.zero) cameraForward = Vector3.forward;

            Quaternion modelRotation = Quaternion.LookRotation(-cameraForward, Vector3.up);

            m_CurrentInstance = Instantiate(m_TajMahalPrefab, hitPose.position, modelRotation);
            m_CurrentInstance.name = "TajMahalARInstance";
            m_CurrentInstance.transform.localScale = Vector3.one * m_DefaultScale;

            if (m_AnchorManager != null)
            {
                m_CurrentAnchor = m_AnchorManager.AttachAnchor(
                    hit.trackable as ARPlane,
                    hitPose);

                if (m_CurrentAnchor != null)
                    m_CurrentInstance.transform.SetParent(m_CurrentAnchor.transform, true);
            }

            PlacedModel = m_CurrentInstance.transform;
            SetState(PlacementState.Placed);
        }

        // ─────────────── Public API ───────────────

        public void Reset()
        {
            SetState(PlacementState.Resetting);
            DestroyCurrentInstance();
            PlacedModel = null;
            m_HasValidHit = false;
            SetState(PlacementState.Searching);
        }

        public void SetScale(float uniformScale)
        {
            if (m_CurrentInstance == null) return;
            float clamped = Mathf.Clamp(uniformScale, m_MinScale, m_MaxScale);
            m_CurrentInstance.transform.localScale = Vector3.one * clamped;
        }

        public float GetCurrentScale()
        {
            if (m_CurrentInstance == null) return m_DefaultScale;
            return m_CurrentInstance.transform.localScale.x;
        }

        public void RotateModel(float yDegrees)
        {
            if (m_CurrentInstance == null) return;
            m_CurrentInstance.transform.Rotate(Vector3.up, yDegrees, Space.World);
        }

        public void BeginEditing()
        {
            if (CurrentState == PlacementState.Placed)
                SetState(PlacementState.Editing);
        }

        public void EndEditing()
        {
            if (CurrentState == PlacementState.Editing)
                SetState(PlacementState.Placed);
        }

        // ─────────────── Helpers ───────────────

        private void SetState(PlacementState newState)
        {
            if (CurrentState == newState) return;
            CurrentState = newState;
            OnStateChanged?.Invoke(newState);
            Debug.Log($"[TajMahalAR] State → {newState}");
        }

        private void DestroyCurrentInstance()
        {
            if (m_CurrentInstance != null)
            {
                Destroy(m_CurrentInstance);
                m_CurrentInstance = null;
            }

            if (m_CurrentAnchor != null)
            {
                Destroy(m_CurrentAnchor.gameObject);
                m_CurrentAnchor = null;
            }
        }

        private void ValidateReferences()
        {
            if (m_RaycastManager == null)
                Debug.LogError("[TajMahalAR] ARRaycastManager not found! Ensure XR Origin is in the scene.", this);
            if (m_TajMahalPrefab == null)
                Debug.LogWarning("[TajMahalAR] TajMahal Prefab not found. Trying to load from Resources...", this);
        }

        void OnDestroy()
        {
            DestroyCurrentInstance();
        }
    }
}
