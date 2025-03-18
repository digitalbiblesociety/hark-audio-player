# HARK Audio Bible Player 

<p align="center">
<img src="https://raw.githubusercontent.com/digitalbiblesociety/hark-audio-player/refs/heads/main/src/demo/angel.svg" height="140px" width="140px">
</p>

<div align="center">

![GitHub License](https://img.shields.io/github/license/digitalbiblesociety/hark-audio-player?color=gold)
![Static Badge](https://img.shields.io/badge/HARKv1-Holy_Audio_Resource_Kit-gold)

</div>

This project is a headless javascript audio bible player open sourced under [GPLv3](./LICENSE), it has no external dependencies. The build is pretty tiny at just over 10KB gzipped. Opting for the no-defaults variation can shrink it even further to under 6KB. It’s fully internationalization (i18n) ready and supports fuzzy search using dynamic rolling Levenshtein thresholds. It works seamlessly with Tailwind CSS, but it doesn’t require it.

#### TODOs:
- timestamp support [x]
- Sharable links / state [x]
- vernacular number support []
- custom api endpoints []
- add keyboard shortcuts, space-bar to play
- 3 demo styles []
    - [base style](./src/demo/modern-theme.html)
    - [brutalist style *in progress*]('./src/demo/brutalist-theme.html')
    - [Deep Blue]('./src/demo/blue-theme.html')
    - pen and ink style *in progress*
