using UnityEngine;

namespace TajMahalAR
{
    /// <summary>
    /// Handles two-finger pinch-to-scale and one-finger horizontal-drag-to-rotate
    /// for the placed Taj Mahal. Only active in Placed/Editing states.
    /// </summary>
    public class TajMahalARInteractionController : MonoBehaviour
    {
        // ─────────────── Inspector Fields ───────────────

        [Header("References")]
        [SerializeField, Tooltip("The placement controller that owns the model.")]
        private TajMahalARPlacementController m_PlacementController;

        [Header("Scale Settings")]
        [SerializeField, Tooltip("Enable two-finger pinch to scale.")]
        private bool m_EnablePinchScale = true;

        [SerializeField, Tooltip("Sensitivity multiplier for pinch scaling.")]
        private float m_ScaleSpeed = 0.005f;

        [Header("Rotation Settings")]
        [SerializeField, Tooltip("Enable one-finger horizontal drag to rotate.")]
        private bool m_EnableRotation = true;

        [SerializeField, Tooltip("Degrees rotated per pixel of horizontal drag.")]
        private float m_RotationSpeed = 0.4f;

        // ─────────────── Private State ───────────────

        private float m_PreviousPinchDistance = -1f;
        private float m_PreviousTouchX = -1f;
        private bool m_IsInteracting = false;

        // ─────────────── Lifecycle ───────────────

        void Awake()
        {
            if (m_PlacementController == null)
                m_PlacementController = FindFirstObjectByType<TajMahalARPlacementController>();
        }

        void Update()
        {
            var state = m_PlacementController?.CurrentState;
            bool isActive = state == TajMahalARPlacementController.PlacementState.Placed
                         || state == TajMahalARPlacementController.PlacementState.Editing;

            if (!isActive)
            {
                ResetGestureState();
                return;
            }

            HandleTouchInput();
        }

        // ─────────────── Touch Handling ───────────────

        private void HandleTouchInput()
        {
            int touchCount = Input.touchCount;

            if (touchCount == 2 && m_EnablePinchScale)
            {
                HandlePinchScale();
            }
            else if (touchCount == 1 && m_EnableRotation)
            {
                HandleOneFingerRotation();
                // Reset pinch state when fewer fingers
                m_PreviousPinchDistance = -1f;
            }
            else
            {
                if (m_IsInteracting)
                {
                    m_PlacementController?.EndEditing();
                    m_IsInteracting = false;
                }
                ResetGestureState();
            }

#if UNITY_EDITOR
            HandleMouseRotation();
#endif
        }

        private void HandlePinchScale()
        {
            Touch touch0 = Input.GetTouch(0);
            Touch touch1 = Input.GetTouch(1);

            float currentDistance = Vector2.Distance(touch0.position, touch1.position);

            if (m_PreviousPinchDistance < 0f)
            {
                // First frame of pinch — just record distance
                m_PreviousPinchDistance = currentDistance;
                m_PlacementController?.BeginEditing();
                m_IsInteracting = true;
                return;
            }

            float delta = currentDistance - m_PreviousPinchDistance;
            m_PreviousPinchDistance = currentDistance;

            if (m_PlacementController == null) return;

            float currentScale = m_PlacementController.GetCurrentScale();
            float newScale = currentScale + delta * m_ScaleSpeed;
            m_PlacementController.SetScale(newScale);
        }

        private void HandleOneFingerRotation()
        {
            Touch touch = Input.GetTouch(0);

            if (touch.phase == TouchPhase.Began)
            {
                m_PreviousTouchX = touch.position.x;
                m_PlacementController?.BeginEditing();
                m_IsInteracting = true;
            }
            else if (touch.phase == TouchPhase.Moved)
            {
                if (m_PreviousTouchX < 0f)
                {
                    m_PreviousTouchX = touch.position.x;
                    return;
                }

                float deltaX = touch.position.x - m_PreviousTouchX;
                m_PreviousTouchX = touch.position.x;

                // Rotate around the world Y axis — keeps model upright on plane
                m_PlacementController?.RotateModel(-deltaX * m_RotationSpeed);
            }
            else if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled)
            {
                m_PreviousTouchX = -1f;
                m_PlacementController?.EndEditing();
                m_IsInteracting = false;
            }
        }

#if UNITY_EDITOR
        private float m_PreviousMouseX = -1f;

        private void HandleMouseRotation()
        {
            if (!m_EnableRotation) return;

            var state = m_PlacementController?.CurrentState;
            bool isActive = state == TajMahalARPlacementController.PlacementState.Placed
                         || state == TajMahalARPlacementController.PlacementState.Editing;
            if (!isActive) return;

            if (Input.GetMouseButtonDown(1))
            {
                m_PreviousMouseX = Input.mousePosition.x;
                m_PlacementController?.BeginEditing();
            }
            else if (Input.GetMouseButton(1))
            {
                if (m_PreviousMouseX >= 0f)
                {
                    float deltaX = Input.mousePosition.x - m_PreviousMouseX;
                    m_PlacementController?.RotateModel(-deltaX * m_RotationSpeed);
                }
                m_PreviousMouseX = Input.mousePosition.x;
            }
            else if (Input.GetMouseButtonUp(1))
            {
                m_PreviousMouseX = -1f;
                m_PlacementController?.EndEditing();
            }

            // Mouse scroll for scale in editor
            float scroll = Input.GetAxis("Mouse ScrollWheel");
            if (Mathf.Abs(scroll) > 0.001f)
            {
                float currentScale = m_PlacementController.GetCurrentScale();
                m_PlacementController.SetScale(currentScale + scroll * 0.1f);
            }
        }
#endif

        private void ResetGestureState()
        {
            m_PreviousPinchDistance = -1f;
            m_PreviousTouchX = -1f;
        }
    }
}
