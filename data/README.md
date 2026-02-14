# Data

This folder contains documentation and pointers to large datasets. The repository itself does not include large geospatial files (due to GitHub size limits).

## Dataset Organization

**For complete data sources and download instructions, see [../DATA_SOURCES.md](../DATA_SOURCES.md).**

All large datasets (~800 MB) are hosted on Google Drive due to size constraints.

### Sample Data (included in repository)

Small reference files are included here for quick access and testing:
- `sample/` - Optional directory for lightweight CSV/JSON files
  - Currently empty but available for adding small reference datasets

### Full Datasets (Google Drive)

Due to GitHub file size limitations, full datasets are hosted on Google Drive:

**Location:** https://drive.google.com/open?id=1cVT_UkIAJWT-I-wsGkITIKPlJPdiMdUH&usp=drive_fs

**Recommended Drive structure:**

```
Chennai_Flood_Accessibility_Data/
├── network/                 # Street network + space syntax outputs
├── flood/                   # Flood layers (100-year return period)
├── dem/                     # Digital elevation model (Copernicus GLO-30)
├── hydrology/               # River/waterway layers
├── buildings/               # Building footprints + morphology
├── land_use/                # Land-use/land-cover classification
├── shelters_services/       # Health, education, shelters, slums
├── boundaries/              # Admin boundaries + study area polygon
└── exports/                 # Final merged layers + map PDFs
```

Each folder corresponds to a dataset category described in DATA_SOURCES.md.

## How to Access

### Option 1: Direct Download (Recommended)
1. **Click the Google Drive link** above
2. **Download individual folders** or the entire dataset
3. **Update file paths** in QGIS projects to point to your download location

### Option 2: Selective Download
1. Download only the folders you need
2. See [../DATA_SOURCES.md](../DATA_SOURCES.md) for details on each dataset
3. Update project file paths accordingly

## Setting Up for Analysis

1. **Download data** from Google Drive link above
2. **Organize locally** following the recommended Drive structure
3. **Update QGIS projects:**
   - Open `.qgz` files in `../code/qgis/projects/`
   - Re-link data sources (right-click layer → Encoding)
   - Point paths to your local download location
4. **Update Python scripts:** Modify `BASE_PATH` variables in `../code/python/` scripts if needed

## Data Sources & Credits

- **Street Network:** OpenStreetMap
- **Flood Model:** OpenCity Data (100-year return period)
- **DEM:** Copernicus GLO-30
- **Buildings:** Google Open Buildings
- **Waterways:** India Water Resources Information System (WRIS)
- **Services/Slums:** Greater Chennai Corporation (GCC)

## Data Size Reference

| Dataset | Size | Format |
|---------|------|--------|
| Network | 150 MB | GPKG + vector |
| Flood | 200 MB | GeoTIFF raster |
| DEM | 150 MB | GeoTIFF raster |
| Hydrology | 80 MB | GPKG vector |
| Buildings | 120 MB | GPKG vector |
| Services | 100 MB | Mixed |
| Boundaries | 80 MB | GPKG vector |
| Exports | 200 MB | PDF + merged layers |
| **Total** | **~800 MB** | |

## Local Data Location (Author Machine)

Full project datasets are backed up locally:

`/Users/danielaresendiz/Library/CloudStorage/OneDrive-UniversityCollegeLondon(2)/SSMAD_2/Project`

(For author reference only; use Google Drive for public access)

## Citation

If you use these datasets, please cite:

```bibtex
@mastersthesis{resendiz2021flood,
  author       = {Resendiz Garcia, Daniela},
  title        = {Severed Accessibility and Urban Resilience:
                  A multi-scalar analysis of flood risk in Chennai},
  school       = {UCL The Bartlett School of Architecture},
  year         = {2021},
  url          = {https://github.com/danielaresendizg/flood-accessibility-chennai}
}
```

Also cite original data sources (see [../DATA_SOURCES.md](../DATA_SOURCES.md)).

## Questions or Issues?

For data-related questions:
- Check [../DATA_SOURCES.md](../DATA_SOURCES.md) for full documentation
- Open an issue in the repository
- Consult original source documentation (links provided)
