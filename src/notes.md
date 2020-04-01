The IdiomaticFn is the one that I think is the "ideal" kind of component to write, but something that's becoming apparent is that it requires vastly more code.  I wonder how that'll play out in the real world.

The idiomatic component is much more code, but when I changed the code to support adding new ids to todo items, none of the UI had to be touched.  It was completely separate from the interesting changes, something which wasn't true for the other components.

Direct translated functional components offer the least extensibility and the most complecting.  They will lead to worse React code.