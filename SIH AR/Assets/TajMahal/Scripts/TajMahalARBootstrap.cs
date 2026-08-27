using UnityEngine;
using UnityEngine.XR.ARFoundation;

namespace TajMahalAR
{
    /// <summary>
    /// Auto-discovery bootstrap: finds all AR components in the scene and wires them
    /// to TajMahalARPlacementController if they were not set in the Inspector.
    /// Attach this to PlacementManager or any persistent GameObject.
    /// </summary>
    public class TajMahalARBootstrap : MonoBehaviour
    {
        [Header("--- Auto-wired at runtime if left empty ---")]
        [SerializeField] private TajMahalARPlacementController m_PlacementController;

        void Awake()
        {
            if (m_PlacementController == null)
                m_PlacementController = FindFirstObjectByType<TajMahalARPlacementController>();

            if (m_PlacementController == null)
            {
                Debug.LogError("[TajMahalAR] TajMahalARPlacementController not found in scene!", this);
                return;
            }

            // Check ARSession
            var arSession = FindFirstObjectByType<ARSession>();
            if (arSession == null)
                Debug.LogWarning("[TajMahalAR] AR Session not found in scene. Add an AR Session GameObject.", this);

            // Verify ARRaycastManager
            var raycastManager = FindFirstObjectByType<ARRaycastManager>();
            if (raycastManager == null)
                Debug.LogError("[TajMahalAR] ARRaycastManager not found. Ensure XR Origin (AR Rig) is in scene.", this);

            // Check for AR Foundation support
            if (!ARSession.CheckAvailability().IsCompatible())
            {
                Debug.LogWarning("[TajMahalAR] AR is not supported on this device.", this);
            }
        }

        void Start()
        {
            // Notify of AR support status
            ARSession.CheckAvailability().completed += (asyncOp) =>
            {
                var availability = ARSession.state;
                if (availability == ARSessionState.Unsupported)
                {
                    Debug.LogError("[TajMahalAR] AR is not supported on this device.");
                    // UI will show the searching panel — user gets stuck there,
                    // which implicitly signals unsupported. For production,
                    // show a proper "AR Unsupported" panel here.
                }
            };
        }
    }
}
