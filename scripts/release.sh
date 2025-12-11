#!/bin/bash

VERSION=$1
RELEASE_FILE=liveupdate_tester_v$VERSION.zip

if [ -z "$VERSION" ]; then
  echo "Error: Version is not provided."
  exit 1
fi

cp -r dist liveupdate_tester

rm -f $RELEASE_FILE
zip -r $RELEASE_FILE liveupdate_tester

rm -rf liveupdate_tester