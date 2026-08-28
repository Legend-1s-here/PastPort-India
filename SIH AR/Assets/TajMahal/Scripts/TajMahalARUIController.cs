using UnityEngine;
using UnityEngine.UI;
using TMPro;

namespace TajMahalAR
{
    /// <summary>
    /// Drives the AR UI (status text, panels, slider, reset button)
    /// based on the placement state from TajMahalARPlacementController.
    /// Auto-wires UI components on Awake if left empty in Inspector.
    /// </summary>
    public class TajMahalARUIController : MonoBehaviour
    {
        // ─────────────── Inspector Fields ───────────────

        [Header("References")]
        [SerializeField, Tooltip("The placement controller to observe and drive.")]
        private TajMahalARPlacementController m_PlacementController;

        [Header("Panels")]
        [SerializeField, Tooltip("Panel shown while searching for a surface.")]
        private GameObject m_SearchingPanel;

        [SerializeField, Tooltip("Panel shown after the Taj Mahal is placed.")]
        private GameObject m_PlacedPanel;

        [Header("Status Text")]
        [SerializeField, Tooltip("TextMeshPro status label (top of screen).")]
        private TextMeshProUGUI m_StatusText;

        [Header("Size Controls")]
        [SerializeField, Tooltip("Slider that controls the Taj Mahal scale.")]
        private Slider m_SizeSlider;

        [SerializeField, Tooltip("Label showing the current size value (optional).")]
        private TextMeshProUGUI m_SizeValueLabel;

        [Header("Buttons")]
        [SerializeField, Tooltip("Reset / Reposition button.")]
        private Button m_ResetButton;

        // ─────────────── Status Messages ───────────────

        private const string MSG_SEARCHING   = "Move your phone slowly to find a flat surface.";
        private const string MSG_PLANE_FOUND = "Tap to place Taj Mahal.";
        private const string MSG_PLACED      = "Taj Mahal placed.";
        private const string MSG_RESET       = "Scan a new surface to place Taj Mahal again.";
        private const string MSG_EDITING     = "Pinch to scale  •  Drag to rotate";

        // ─────────────── Private State ───────────────

        private bool m_SliderInitialised = false;

        // ─────────────── Lifecycle ───────────────

        void Awake()
        {
            AutoWireUIReferences();
        }

        public void AutoWireUIReferences()
        {
            if (m_PlacementController == null)
                m_PlacementController = FindFirstObjectByType<TajMahalARPlacementController>();

            // Find Canvas in scene if panels are missing
            var canvas = FindFirstObjectByType<Canvas>();
            if (canvas != null)
            {
                if (m_SearchingPanel == null)
                {
                    var searchTrans = canvas.transform.Find("SearchingPanel");
                    if (searchTrans != null) m_SearchingPanel = searchTrans.gameObject;
                }

                if (m_PlacedPanel == null)
                {
                    var placedTrans = canvas.transform.Find("PlacedPanel");
                    if (placedTrans != null) m_PlacedPanel = placedTrans.gameObject;
                }

                if (m_StatusText == null)
                {
                    if (m_SearchingPanel != null)
                        m_StatusText = m_SearchingPanel.GetComponentInChildren<TextMeshProUGUI>(true);
                    else
                        m_StatusText = canvas.GetComponentInChildren<TextMeshProUGUI>(true);
                }

                if (m_SizeSlider == null)
                {
                    if (m_PlacedPanel != null)
                        m_SizeSlider = m_PlacedPanel.GetComponentInChildren<Slider>(true);
                    else
                        m_SizeSlider = canvas.GetComponentInChildren<Slider>(true);
                }

                if (m_ResetButton == null)
                {
                    if (m_PlacedPanel != null)
                        m_ResetButton = m_PlacedPanel.GetComponentInChildren<Button>(true);
                    else
                        m_ResetButton = canvas.GetComponentInChildren<Button>(true);
                }
            }
        }

        void Start()
        {
            AutoWireUIReferences();

            // Subscribe to state changes
            if (m_PlacementController != null)
                m_PlacementController.OnStateChanged += OnPlacementStateChanged;

            // Wire up Reset button
            if (m_ResetButton != null)
            {
                m_ResetButton.onClick.RemoveAllListeners();
                m_ResetButton.onClick.AddListener(OnResetClicked);
            }

            // Wire up size slider
            if (m_SizeSlider != null)
            {
                m_SizeSlider.onValueChanged.RemoveAllListeners();
                m_SizeSlider.onValueChanged.AddListener(OnSliderChanged);
            }

            // Show initial state
            OnPlacementStateChanged(TajMahalARPlacementController.PlacementState.Searching);
        }

        void OnDestroy()
        {
            if (m_PlacementController != null)
                m_PlacementController.OnStateChanged -= OnPlacementStateChanged;

            if (m_ResetButton != null)
                m_ResetButton.onClick.RemoveListener(OnResetClicked);

            if (m_SizeSlider != null)
                m_SizeSlider.onValueChanged.RemoveListener(OnSliderChanged);
        }

        // ─────────────── State Handling ───────────────

        private void OnPlacementStateChanged(TajMahalARPlacementController.PlacementState state)
        {
            switch (state)
            {
                case TajMahalARPlacementController.PlacementState.Searching:
                    ShowSearchingUI();
                    SetStatus(MSG_SEARCHING);
                    break;

                case TajMahalARPlacementController.PlacementState.PlaneFound:
                    ShowSearchingUI();
                    SetStatus(MSG_PLANE_FOUND);
                    break;

                case TajMahalARPlacementController.PlacementState.ReadyToPlace:
                    ShowSearchingUI();
                    SetStatus(MSG_PLANE_FOUND);
                    break;

                case TajMahalARPlacementController.PlacementState.Placed:
                    ShowPlacedUI();
                    SetStatus(MSG_PLACED);
                    InitialiseSlider();
                    break;

                case TajMahalARPlacementController.PlacementState.Editing:
                    ShowPlacedUI();
                    SetStatus(MSG_EDITING);
                    break;

                case TajMahalARPlacementController.PlacementState.Resetting:
                    ShowSearchingUI();
                    SetStatus(MSG_RESET);
                    m_SliderInitialised = false;
                    break;
            }
        }

        // ─────────────── UI Show/Hide ───────────────

        private void ShowSearchingUI()
        {
            SetActive(m_SearchingPanel, true);
            SetActive(m_PlacedPanel, false);
        }

        private void ShowPlacedUI()
        {
            SetActive(m_SearchingPanel, false);
            SetActive(m_PlacedPanel, true);
        }

        private void SetStatus(string message)
        {
            if (m_StatusText != null)
                m_StatusText.text = message;
        }

        private static void SetActive(GameObject go, bool active)
        {
            if (go != null && go.activeSelf != active)
                go.SetActive(active);
        }

        // ─────────────── Slider Logic ───────────────

        private void InitialiseSlider()
        {
            if (m_SizeSlider == null || m_PlacementController == null) return;
            if (m_SliderInitialised) return;

            m_SizeSlider.minValue = m_PlacementController.MinScale;
            m_SizeSlider.maxValue = m_PlacementController.MaxScale;
            m_SizeSlider.value    = m_PlacementController.GetCurrentScale();
            m_SliderInitialised = true;

            UpdateSizeLabel(m_SizeSlider.value);
        }

        private void OnSliderChanged(float value)
        {
            if (m_PlacementController == null) return;
            m_PlacementController.SetScale(value);
            UpdateSizeLabel(value);
        }

        private void UpdateSizeLabel(float value)
        {
            if (m_SizeValueLabel != null)
                m_SizeValueLabel.text = $"{value:F3}×";
        }

        // ─────────────── Reset Button ───────────────

        private void OnResetClicked()
        {
            m_PlacementController?.Reset();
        }
    }
}
