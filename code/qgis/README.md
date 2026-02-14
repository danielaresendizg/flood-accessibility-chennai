# QGIS Projects and Styles

QGIS project files (`.qgz`) and layer styles (`.qml`) used for spatial analysis, accessibility modelling, and map composition.

## Project Files

### Analysis & Mapping Projects

- **`Chennai_analysis.qgz`**
  - Primary analysis project for accessibility + exposure overlays
  - Contains: Street network, flood extent, critical services, land use
  - Use for: Stages 2-4 of analysis (exposure overlays, resilience strategies)
  - Scale: City-wide (1:50,000 - 1:100,000)

- **`chennai_floods.qgz`**
  - Focused on flood hazard and hydrology
  - Contains: Flood extent, waterways, DEM, drainage infrastructure
  - Use for: Understanding flood dynamics, WSUD zone identification
  - Scale: City-wide

- **`segment_analysis_chennai.qgz`**
  - Street network + Space Syntax metrics
  - Contains: DepthmapX outputs (NAIN, NACH at r800, r3000)
  - Use for: Stage 1 (network reconfiguration), accessibility analysis
  - Scale: Segment-level (resolves individual street segments)

- **`simulations.qgz`**
  - Clustering and resilience strategy mapping
  - Contains: Safe zones, shelter locations, priority corridors
  - Use for: Stage 4 (local resilience modelling, site-specific planning)
  - Scale: Neighborhood to district

## Style Files

Layer styles (`.qml`) define how data is visualized. Reuse across projects:

- **`SSX_Colour_Range.qml`**
  - Space Syntax colour ramp (blue → red gradient)
  - For visualizing: NAIN, NACH, accessibility indices
  - Suitable for: Continuous metrics (0-1 scale)
  - Apply to: Angular centrality layers from DepthmapX

- **`landcover.qml`**
  - Categorical landcover classification style
  - Classes: Water, urban, vegetation, bare soil, etc.
  - Apply to: Landcover/land-use raster layers

## How to Use

### Opening Projects

1. **Download data:** See [../../DATA_SOURCES.md](../../DATA_SOURCES.md)
2. **Open project:**
   ```bash
   qgis Chennai_analysis.qgz
   ```
3. **Relink layers if needed:**
   - Right-click on layer → Properties → Source
   - Update path to match your local data location
   - Or: Layer → Make Permanent (to embed data path)

### Applying Styles

1. Right-click on layer → Properties → Symbology
2. Load style: Style menu (bottom left) → Load style
3. Browse to `.qml` file
4. Click "Load Style"

Or programmatically (Python console):
```python
layer = iface.activeLayer()
layer.loadNamedStyle('styles/SSX_Colour_Range.qml')
```

## Project Structure & Layers

### `Chennai_analysis.qgz`
```
Base Layers:
├── boundaries (study area + admin zones)
├── street_network (normal condition)
├── flood_extent (100-year scenario)
├── dem (digital elevation model)

Thematic Layers:
├── health_facilities
├── education_facilities
├── shelters (emergency)
├── slums (informal settlements)
├── land_use

Derived Layers:
├── accessibility_normal (NAIN/NACH r3000)
├── accessibility_flood (adjusted)
├── exposure_index
└── priority_corridors
```

### `segment_analysis_chennai.qgz`
```
Street Network:
├── street_segments (basic geometry)
├── nain_r800 (local integration, 800m radius)
├── nain_r3000 (global integration, 3000m radius)
├── nach_r800 (local angular closeness)
└── nach_r3000 (global angular closeness)

Flood Condition:
├── street_segments_flood_adjusted
├── nain_r3000_flood
└── accessibility_loss_percent
```

## Notes on Data Paths

- **Embedded paths:** QGIS stores dataset paths in project files
- **Cross-platform:** Paths may differ if data location differs from original author's setup
- **Relinking:** If layers show as "broken" (red 'X'), relink by:
  1. Layer → Data Source Manager (Ctrl+L)
  2. Select layer → Browse to new location
  3. Click "Apply" → "OK"

## Styles & Symbology

**Space Syntax Integration:**
- Angular Integration Index (NAIN): Lower values (blue) = more local; higher (red) = more global
- Angular Choice (NACH): Similar gradient, represents betweenness
- Accessibility metrics: Normalized 0-1, displayed as continuous color ramp

**Flood Visualization:**
- Flood extent: Semi-transparent blue (60% opacity)
- Flood depth: Continuous ramp (light → dark blue, 0-3m)
- Penalties: Yellow (75%) / Red (100%) for affected segments

## Building Custom Projects

To create a new project from scratch:

1. **Start fresh:** File → New
2. **Set CRS:** Project → Properties → CRS = EPSG:32644 (Chennai)
3. **Add layers:** Layer → Add Layer
4. **Save:** File → Save As → Chennai_custom.qgz
5. **Apply styles:** Use `.qml` files from `styles/` folder

## Troubleshooting

**"Layer broken" or "?" symbol:**
- Relink data source (see above)
- Check that files exist at expected paths
- Verify CRS matches (EPSG:32644 for Chennai)

**Missing style:**
- Reapply `.qml` file manually (see "Applying Styles" above)
- Check file permissions (should be readable)

**Performance issues:**
- Large flood/DEM rasters can be slow
- Simplify: Remove layers you don't need
- Reproject to Web Mercator if working online

## Related Documentation

- [../../DATA_SOURCES.md](../../DATA_SOURCES.md) - Data download and setup
- [../README.md](../README.md) - Code workflow overview
- [../../README.md](../../README.md) - Main project documentation
- [../../latex/](../../latex/) - LaTeX source (detailed methodology)

