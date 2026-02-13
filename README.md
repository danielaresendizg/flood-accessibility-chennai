# Severed Accessibility and Urban Resilience: Flood Risk in Chennai, India

**Adaptive Design and Research Paper** | MSc Urban Development Planning | UCL The Bartlett | 2021

**Author:** Daniela Resendiz Garcia

---

## Abstract

This study introduces a spatial methodology that models accessibility loss under extreme flood conditions, integrating a 100-year return period scenario with network-based spatial analysis. Applied to Chennai, India, the approach overlays flood impact on road networks, land use, and infrastructure to assess where functional accessibility collapses. A clustering analysis further identifies priority zones for safe shelter allocation and evacuation planning.

## Research Questions

1. How does street network configuration influence flood vulnerability?
2. What role can blue-green infrastructure play in enhancing flood resilience?
3. How can Space Syntax analysis inform flood-resilient urban design?

## Key Findings

- **Accessibility degradation is spatially uneven.** Compact urban forms retain greater connectivity under stress, while dispersed or fragmented areas become structurally isolated.
- **Resilience is reframed** not as physical resistance to flooding, but as the preservation of spatial connection under disruption.
- Key corridors and intervention areas are mapped at both local and metropolitan scales, offering actionable entry points for adaptive planning.

## Methodology

| Step | Method | Tools |
|------|--------|-------|
| Network analysis | Space Syntax (NAIN, NACH) at multiple radii | DepthmapX, QGIS |
| Flood modelling | 100-year return period overlay on road network | GIS overlay analysis |
| Vulnerability mapping | Land use + flood extent + infrastructure access | QGIS, satellite imagery |
| Clustering | Priority zone identification for shelter/evacuation | Spatial statistics |
| Blue-green infrastructure | WSUD-based design strategies | Design analysis |

### Study Area
- **Adyar River basin**, Chennai, Tamil Nadu, India
- Population: ~2 million residents
- High flood vulnerability due to encroachment on water bodies

### Data Sources
- OpenStreetMap for street network data
- Chennai Metropolitan Development Authority land use maps
- Flood inundation maps from 2015 Chennai floods
- Satellite imagery (Google Earth, Sentinel-2)

## Repository Structure

```
flood-accessibility-chennai/
├── README.md
├── LICENSE
├── .gitignore
├── docs/                    # Project documentation and report
├── figures/                 # Maps and result visualisations
└── data/                    # Reference data descriptions
```

## Software and Tools

- **DepthmapX** - Space Syntax segment angular analysis
- **QGIS** - GIS analysis, flood overlay, mapping
- **OpenStreetMap** - Street network data

## Citation

If you use this work, please cite:

```
Resendiz Garcia, D. (2021). Street Network and Blue-Green Infrastructure for Flood Resilience:
Chennai, India. MSc Urban Development Planning, UCL The Bartlett.
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Daniela Resendiz Garcia - [GitHub](https://github.com/danielaresendizg)
