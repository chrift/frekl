# Frekl

Zero config simple development logging system

## Example usage

```
// Importing frekl will start the udp server and expose a static file server for the frekl dashboard
// The url of the frekl dashboard will be logged to the console
import frekl from '@chrift/frekl'

for(let i = 0; i <= 100; i++)
    frekl('Line number', i)
```
