#!/bin/bash

docker run -it --env-file=.env -e "CONFIG=$(cat docsearch-config.json | jq -r tostring)" algolia/docsearch-scraper

