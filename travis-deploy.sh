#!/bin/bash
set -e

image="buzzn/metering-api"
docker tag metering-api "$image:$TRAVIS_TAG-$ARCH"
docker push "$image:$TRAVIS_TAG-$ARCH"
