salesforce-profile-generator
============================

An update on the profile generation tool

[![Version](https://img.shields.io/npm/v/salesforce-profile-generator.svg)](https://npmjs.org/package/salesforce-profile-generator)
[![CircleCI](https://circleci.com/gh/todd-teese/salesforce-profile-generator/tree/master.svg?style=shield)](https://circleci.com/gh/todd-teese/salesforce-profile-generator/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/todd-teese/salesforce-profile-generator?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/salesforce-profile-generator/branch/master)
[![Codecov](https://codecov.io/gh/todd-teese/salesforce-profile-generator/branch/master/graph/badge.svg)](https://codecov.io/gh/todd-teese/salesforce-profile-generator)
[![Greenkeeper](https://badges.greenkeeper.io/todd-teese/salesforce-profile-generator.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/todd-teese/salesforce-profile-generator/badge.svg)](https://snyk.io/test/github/todd-teese/salesforce-profile-generator)
[![Downloads/week](https://img.shields.io/npm/dw/salesforce-profile-generator.svg)](https://npmjs.org/package/salesforce-profile-generator)
[![License](https://img.shields.io/npm/l/salesforce-profile-generator.svg)](https://github.com/todd-teese/salesforce-profile-generator/blob/master/package.json)

<!-- toc -->

<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g salesforce-profile-generator
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
salesforce-profile-generator/0.0.7 linux-x64 node-v14.17.6
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx generate:profile [-s <string>] [-t <string>] [-b] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-generateprofile--s-string--t-string--b---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx generate:profile [-s <string>] [-t <string>] [-b] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Generate profiles based on CSV and JSON Files

```
Generate profiles based on CSV and JSON Files

USAGE
  $ sfdx generate:profile [-s <string>] [-t <string>] [-b] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --ignoreblank                                                                 Ignore blanks within CSV files?
  -s, --source=source                                                               Source Folder to pull profiles from
  -t, --target=target                                                               Target Folder to create profiles in
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/generate/profile.js](https://github.com/todd-teese/salesforce-profile-generator/blob/v0.0.7/lib/commands/generate/profile.js)_
<!-- commandsstop -->
