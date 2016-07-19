This is an example of a vanilla JavaEE 7 application generated with [JBoss Forge and Eclipse Neon](http://tools.jboss.org/), this application demonstrates the following technologies:

-JPA
-JAX-RS
-Bean Validation
-AngularJS
-Java EE in General

It can be replicated with the following forge script

```
#Forge script
project-new --named bookstore --top-level-package com.nabenik.bookstore --stack JAVA_EE_7

jpa-new-entity --named Book;
jpa-new-field --named title;
jpa-new-field --named description --length 2000;
jpa-new-field --named price --type java.lang.Float;
jpa-new-field --named nbOfPages --type java.lang.Integer;
jpa-new-field --named publicationDate --type java.util.Date --temporalType DATE;

java-new-enum --named Language --target-package com.nabenik.bookstore.model;
java-add-enum-const --named ENGLISH SPANISH;
cd ../Book.java;
jpa-new-field --named language --type com.nabenik.bookstore.model.Language;

jpa-new-entity --named Author;
jpa-new-field --named firstName;
cd ../Book.java;

jpa-new-field --named author --type com.nabenik.bookstore.model.Author --relationship-type Many-to-One;
constraint-add --constraint NotNull --on-property title;
constraint-add --constraint Past --on-property publicationDate;
constraint-add --on-property description --constraint Size --max 3000;

rest-generate-endpoints-from-entities --targets com.nabenik.bookstore.model.*;
scaffold-generate --provider AngularJS --targets com.nabenik.bookstore.model.*;
```

This code is available under the (WTFPL)[http://www.wtfpl.net/]
