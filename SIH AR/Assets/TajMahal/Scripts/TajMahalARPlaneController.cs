using UnityEngine;
using UnityEngine.XR.ARFoundation;

namespace TajMahalAR
{
    /// <summary>
    /// Controls the placement reticle (circle indicator) that follows the
    /// detected horizontal plane. Hides after placement. Fades plane meshes
    /// after the model is placed to keep the AR view clean.
    /// Auto-wires references on Awake/Start if not set in Inspector.
    /// </summary>
    public class TajMahalARPlaneController : MonoBehaviour
    {
        // ─────────────── Inspector Fields ───────────────

        [Header("References")]
        [SerializeField, Tooltip("The placement controller to observe.")]
        private TajMahalARPlacementController m_PlacementController;

        [SerializeField, Tooltip("ARPlaneManager to control plane visibility.")]
        private ARPlaneManager m_PlaneManager;

        [Header("Reticle")]
        [SerializeField, Tooltip("The reticle GameObject (circle/ring) to show while searching.")]
        private GameObject m_Reticle;

        [SerializeField, Tooltip("How fast the reticle smoothly follows the hit point.")]
        private float m_ReticleFollowSpeed = 15f;

        [Header("Plane Visualization")]
        [SerializeField, Tooltip("Hide plane visualizations after the model is placed.")]
        private bool m_HidePlanesAfterPlacement = true;

        // ─────────────── Private State ───────────────

        private bool m_IsPlaced = false;
        private Vector3 m_ReticleTargetPos;
        private bool m_ReticleVisible = false;

        // ─────────────── Lifecycle ───────────────

        void Awake()
        {
            AutoWirePlaneReferences();
        }

        public void AutoWirePlaneReferences()
        {
            if (m_PlacementController == null)
                m_PlacementController = FindFirstObjectByType<TajMahalARPlacementController>();
            if (m_PlaneManager == null)
                m_PlaneManager = FindFirstObjectByType<ARPlaneManager>();
            if (m_Reticle == null)
            {
                var reticleGo = GameObject.Find("PlacementReticle");
                if (reticleGo != null) m_Reticle = reticleGo;
            }
        }

        void Start()
        {
            AutoWirePlaneReferences();

            if (m_PlacementController != null)
                m_PlacementController.OnStateChanged += OnPlacementStateChanged;

            SetReticleVisible(false);
        }

        void OnDestroy()
        {
            if (m_PlacementController != null)
                m_PlacementController.OnStateChanged -= OnPlacementStateChanged;
        }

        void Update()
        {
            if (m_IsPlaced) return;

            // Follow the current raycast hit point
            if (m_PlacementController != null && m_PlacementController.HasValidHit)
            {
                m_ReticleTargetPos = m_PlacementController.CurrentHitPoint;

                if (!m_ReticleVisible)
                    SetReticleVisible(true);

                // Smoothly move the reticle to the hit point
                if (m_Reticle != null)
                {
                    m_Reticle.transform.position = Vector3.Lerp(
                        m_Reticle.transform.position,
                        m_ReticleTargetPos,
                        Time.deltaTime * m_ReticleFollowSpeed);

                    // Keep reticle facing up (aligned with the plane normal)
                    m_Reticle.transform.rotation = Quaternion.Euler(90f, 0f, 0f);
                }
            }
            else
            {
                if (m_ReticleVisible)
                    SetReticleVisible(false);
            }
        }

        // ─────────────── State Handling ───────────────

        private void OnPlacementStateChanged(TajMahalARPlacementController.PlacementState state)
        {
            switch (state)
            {
                case TajMahalARPlacementController.PlacementState.Placed:
                case TajMahalARPlacementController.PlacementState.Editing:
                    m_IsPlaced = true;
                    SetReticleVisible(false);
                    if (m_HidePlanesAfterPlacement)
                        SetPlaneVisualizersVisible(false);
                    break;

                case TajMahalARPlacementController.PlacementState.Searching:
                case TajMahalARPlacementController.PlacementState.Resetting:
                    m_IsPlaced = false;
                    SetPlaneVisualizersVisible(true);
                    break;

                case TajMahalARPlacementController.PlacementState.PlaneFound:
                    m_IsPlaced = false;
                    SetPlaneVisualizersVisible(true);
                    break;
            }
        }

        // ─────────────── Helpers ───────────────

        private void SetReticleVisible(bool visible)
        {
            m_ReticleVisible = visible;
            if (m_Reticle != null)
                m_Reticle.SetActive(visible);
        }

        private void SetPlaneVisualizersVisible(bool visible)
        {
            if (m_PlaneManager == null) return;

            foreach (ARPlane plane in m_PlaneManager.trackables)
            {
                var visualizer = plane.GetComponent<MeshRenderer>();
                if (visualizer != null)
                    visualizer.enabled = visible;

                var lineRenderer = plane.GetComponent<LineRenderer>();
                if (lineRenderer != null)
                    lineRenderer.enabled = visible;
            }
        }
    }
}
