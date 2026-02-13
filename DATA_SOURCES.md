# Data Sources and Access (Chennai Flood Accessibility)

GitHub is used for code, small samples, and documentation. Large geospatial datasets are hosted on Google Drive.

## What goes in GitHub

- This repository (documentation + small files)
- Final figures (PNG/PDF) used in the paper
- Small sample data in `data/sample/` (optional)

## What goes in Google Drive

Create a folder (example):

`Chennai_Flood_Accessibility_Data/`

Recommended subfolders:

```
Chennai_Flood_Accessibility_Data/
├── network/                 # OSM roads / segment analysis outputs
├── flood/                   # Flood extent / return period layers
├── land_use/                # CMDA land use maps
├── shelters_services/       # Shelter locations, critical services
├── boundaries/              # Admin boundaries / study area polygon
└── exports/                 # Any final merged layers used in QGIS maps
```

## Public access checklist

1. Put the curated datasets in a single Drive folder.
2. Set sharing to: **Anyone with the link → Viewer**.
3. Copy the folder URL and paste it into:
   - `README.md` (Data Access section)
   - `data/README.md`

## Links to fill in

## Current data location (local)

Your full project datasets currently live here:

`/Users/danielaresendiz/Library/CloudStorage/OneDrive-UniversityCollegeLondon(2)/SSMAD_2/Project`

## Public link (recommended)

- **Google Drive folder (public):** _TODO_

## Notes

- Do not upload raw `.shp` components separately unless zipped; prefer `.gpkg` for fewer files.
- Keep anything >100MB out of GitHub.
