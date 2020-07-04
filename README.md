# ES6-Dynamic-Import-String
Base code to show how to using code strings in dynamic imports

##
This shows a simple structure for using a service worker to intercept and provide strings to a dynamic import statement.

There are some reports, that Chrome will not accept DataURIs in the import function, this effectively gets around that.
Additionally, this method should remove the need to DataURI encode the code in other browsers (not tested though)

Built and Tested in Chrome@83

[index](https://kremnari.github.io/ES6-Dynamic-Import-String/src/index.html)
