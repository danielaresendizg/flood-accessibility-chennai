# Figures

This folder contains maps, visualizations, and result figures used in the paper and README.

## Folder Structure

```
figures/
├── README.md                        # This file
├── chennai_maps.pdf                 # Complete map atlas (all results)
│
├── readme/                          # Figures referenced in main README.md
│   ├── hero_chennai_flood.webp     # Header image
│   ├── chennai_maps_p02_accessibility.png
│   ├── chennai_maps_p04_density_accessibility.png
│   ├── chennai_maps_p05_shelters.png
│   └── chennai_maps_p06_priority_corridors.png
│
└── other/                           # Project development figures (not in final paper)
    ├── 01.chennai.webp
    ├── Presentation1.png
    ├── growth.png
    ├── north.png
    └── chennai_project2.png
```

## Key Results Maps

### Full Atlas

- **`chennai_maps.pdf`** (12 MB)
  - Complete map atlas exported from QGIS
  - All analysis results: accessibility, flood impact, shelters, priority corridors
  - Multi-page PDF with consistent styling
  - Used for paper figures and presentations

### Individual Maps (README)

Cropped/extracted figures for README display:

- **`hero_chennai_flood.webp`**
  - Header image showing 2015 Chennai floods
  - Used in main README.md header
  - Aspect: 62% width

- **`chennai_maps_p02_accessibility.png`**
  - Accessibility comparison: normal vs. flood conditions
  - Scale: r3000 (city-wide) and r800 (local)
  - Shows accessibility degradation extent

- **`chennai_maps_p04_density_accessibility.png`**
  - Population density overlaid with flood-adjusted accessibility
  - Highlights vulnerable populations in low-accessibility areas
  - Multi-layer visualization

- **`chennai_maps_p05_shelters.png`**
  - Emergency shelter locations under flood conditions
  - Shows shelter accessibility + capacity
  - Evaluation of existing shelter efficacy

- **`chennai_maps_p06_priority_corridors.png`**
  - Priority corridors for evacuation/emergency access
  - Global-scale resilience strategy
  - Integration of accessibility + critical infrastructure

## Map Specifications

**Coordinate Reference System (CRS):** EPSG:32644 (UTM Zone 44N)

**Basemap:** OpenStreetMap (in QGIS exports)

**Scale:** Multiple scales depending on purpose
- **City-wide:** 1:50,000 - 1:100,000
- **District-level:** 1:20,000 - 1:50,000
- **Detail:** 1:10,000 or larger

**Color Schemes:**
- **Accessibility metrics:** Blue (low) → Red (high) gradient using Space Syntax conventions
- **Flood extent:** Semi-transparent blue overlay
- **Exposure:** Categorical colors by service type

**Projection:** All maps use UTM Zone 44N for distance measurements and spatial analysis accuracy

## Figure Attribution

All maps generated from:
- **Data:** OpenStreetMap, Google Open Buildings, Copernicus GLO-30, OpenCity Data, GCC
- **Analysis:** DepthmapX (Space Syntax), QGIS (spatial overlay), Python (validation)
- **Software:** QGIS 3.x for map composition and export

## Regenerating Figures

To update/regenerate maps:

1. **Open QGIS project:** `code/qgis/projects/Chennai_analysis.qgz`
2. **Update layers:** If data has changed, re-link in QGIS
3. **Adjust symbology:** Use `.qml` styles from `code/qgis/styles/`
4. **Export map:**
   - File → Print Layout (or use existing layout)
   - File → Export as PDF/PNG
   - Ensure resolution ≥ 300 DPI for publication

## Using Figures in Publications

**Citation format:**
```
Author(s) (Year). [Figure title]. In: [Paper title]. [Journal/Conference]. [Link to GitHub]
```

**Example:**
```
Resendiz Garcia, D. (2021). Accessibility under normal vs. flood conditions.
In: Severed Accessibility and Urban Resilience. BARC0026 Coursework.
https://github.com/danielaresendizg/flood-accessibility-chennai
```

**Permissions:** All figures are open access under MIT License (see repository LICENSE).

## High-Resolution Exports

For print/publication use:

1. Open QGIS project: `code/qgis/projects/Chennai_analysis.qgz`
2. File → Export as Image
3. Set resolution: **600 DPI** for high-quality print
4. Format: **PNG** (supports transparency) or **PDF** (scalable)
5. Save to `figures/` folder with descriptive name

## Troubleshooting

**Maps appear blank or broken:**
- Check that QGIS projects have re-linked data (see `code/qgis/README.md`)
- Ensure all layers are visible (eye icon enabled)
- Verify CRS is EPSG:32644

**Colors differ from expected:**
- Reapply `.qml` style files from `code/qgis/styles/`
- Check that layer name matches style assumptions

**Missing elements:**
- Verify all base layers are present in data folder
- Check layer stacking order (draw order)
- Confirm print layout settings are correct

## Related Documentation

- [../code/qgis/README.md](../code/qgis/README.md) - QGIS project details
- [../DATA_SOURCES.md](../DATA_SOURCES.md) - Data sources used in maps
- [../README.md](../README.md) - Main project documentation
- [../papers/README.md](../papers/README.md) - Paper and figure references
