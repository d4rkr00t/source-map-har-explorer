## Source Map Har Explorer

Wrapper around [source-map-explorer](https://github.com/danvk/source-map-explorer) that can download assets from analyzing HAR files.

## Usage

1. Fetch JS and Source Map assets specified inside of a HAR file:

```
npx source-map-har-explorer fetch path_to_file.har
```

2. Run analysis:

```
npx source-map-har-explorer explore
```
