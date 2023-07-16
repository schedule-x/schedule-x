# Calendar architecture

## Image

https://schedule-x.s3.eu-west-1.amazonaws.com/schedule-x__architecture.png

## Description

The calendar uses a three layered architecture.

1. Implementation layer: User configuration and definition of events.
2. Application core: is always loaded, and consists of the calendar wrapper, a menu, and a data store
3. Application views: are loaded dynamically into the calendar, as defined in layer 1 by the implementer. Once loaded,
   this layer is controlled by layer 2.
