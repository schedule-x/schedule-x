Date: 2023-07-09
Author: Tom Österlund

---

# Project structure

## Overview

https://s3.console.aws.amazon.com/s3/object/schedule-x?region=eu-west-1&prefix=schedule-x__project+structure.png

## source code folders

Home to all source code to be compiled into the application, are `packages` and `shared` folders. All folders
of `packages` are to be considered their own applications, and to be published as such.
`shared` is home to code that can be used across packages.

## development folder

Home of code that is used for local development of the application.
