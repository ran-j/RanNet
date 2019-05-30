 
/*--- reset code ---*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
dl,
dt,
dd,
ol,
nav ul,
nav li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
	display: block;
}

ol,
ul {
	list-style: none;
	margin: 0px;
	padding: 0px;
}

blockquote,
q {
	quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
	content: '';
	content: none;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}


/* start editing from here */

a {
	text-decoration: none;
}

.txt-wthree-rt {
	text-align: right;
}


/* text align right */

.txt-wthree-lt {
	text-align: left;
}


/* text align left */

.txt-wthree-center {
	text-align: center;
}


/* text align center */

.float-rt {
	float: right;
}


/* float right */

.float-lt {
	float: left;
}


/* float left */

.clear {
	clear: both;
}


/* clear float */

.pos-relative {
	position: relative;
}


/* Position Relative */

.pos-absolute {
	position: absolute;
}


/* Position Absolute */

.vertical-base {
	vertical-align: baseline;
}


/* vertical align baseline */

.vertical-top {
	vertical-align: top;
}


/* vertical align top */

nav.vertical ul li {
	display: block;
}


/* vertical menu */

nav.horizontal ul li {
	display: inline-block;
}


/* horizontal menu */

img {
	max-width: 100%;
}


/*--- end reset code ---*/

body {
	font-family: 'Work Sans', sans-serif;
	background: url(../images/bg.jpg) no-repeat center;
	background-size: cover;
}

p {
	font-size: 1em;
	line-height: 1.5;
}

.text-center {
	text-align: center;
}


/* Header */

a {
	transition: 0.5s all;
	-webkit-transition: 0.5s all;
	-moz-transition: 0.5s all;
	-o-transition: 0.5s all;
	-ms-transition: 0.5s all;
	text-decoration: none;
}

.agileits-logo {
	padding: 2em;
}

.container-w3layouts {
	width: 50%;
	margin: auto;
	padding: 7em 0 9em;
}

.agileits-logo h1 a {
	color: #fff;
	display: inline-block;
	font-size: 2.5em;
	font-family: 'Work Sans', sans-serif;
	text-transform: capitalize;
	font-style: italic;
	font-weight: 500;
}

.agileits-logo h1 span {
	color: #fff;
	font-size: 1.2em;
	margin-right: 10px;
}

h2.txt-wthree {
	font-size: 5em;
	color: #fff;
	text-transform: capitalize;
	font-weight: 600;
	text-shadow: 3px 3px 3px #252b4f;
	margin: 0.2em 0;
}

.home a {
	display: block;
	background: #fff;
	width: 16%;
	border: 5px double #1e1d23;
	padding: 7px 0;
	margin: 2em auto 0;
	color: #000;
	text-transform: uppercase;
	font-weight: 600;
	border-radius: 10px;
}

.container-w3layouts p {
	color: #fff;
	font-size: 22px;
	font-weight: 300;
	margin: 35px 0;
}

.w3_agile-footer p {
	text-align: center;
	font-size: 14px;
	color: #fff;
	letter-spacing: 1px;
	font-weight: 300;
}

.w3_agile-footer p a {
	color: #fff;
}

.w3_agile-footer p a:hover {
	color: #000;
}

@media screen and (max-width: 1080px) {
	.container-w3layouts {
		width: 54%;
		padding: 3em 0 5em;
	}
}

@media screen and (max-width: 1050px) {
	.container-w3layouts {
		width: 55%;
	}
}

@media screen and (max-width: 1024px) {
	h2.txt-wthree {
		font-size: 4.5em;
	}
	.container-w3layouts {
		width: 56%;
	}
}

@media screen and (max-width: 1024px) {
	.container-w3layouts {
		width: 58%;
	}
}

@media screen and (max-width: 991px) {
	h2.txt-wthree {
		font-size: 4.4em;
	}
	.container-w3layouts {
		width: 64%;
	}
}

@media screen and (max-width: 900px) {
	.container-w3layouts {
		width: 72%;
	}
}

@media screen and (max-width: 800px) {
	.container-w3layouts p {
		color: #fff;
		font-size: 20px;
	}
	.w3_agile-footer {
		padding: 0em 0 4em;
	}
}
@media screen and (max-width: 736px) {
	h2.txt-wthree {
		font-size: 4.2em;
	}
}

@media screen and (max-width: 667px) {
	h2.txt-wthree {
		font-size: 4em;
	}
	.container-w3layouts {
		width: 80%;
	}
}

@media screen and (max-width: 640px) {
	.container-w3layouts p {
		font-size: 19px;
	}
	h2.txt-wthree {
		font-size: 3.8em;
	}
}

@media screen and (max-width: 600px) {
	.container-w3layouts p {
		font-size: 18px;
	}
}

@media screen and (max-width: 568px) {
	h2.txt-wthree {
		font-size: 3.6em;
	}
	.container-w3layouts p {
		font-size: 17px;
	}
}

@media screen and (max-width: 480px) {
	.agileits-logo h1 a {
		font-size: 2.4em;
	}
	.container-w3layouts {
		width: 94%;
	}
	.home a {
		width: 20%;
		padding: 6px 0;
		font-size: 0.9em;
	}
	.container-w3layouts p {
		font-size: 16px;
	}
}

@media screen and (max-width: 414px) {
	h2.txt-wthree {
		font-size: 3.4em;
	}
	.w3_agile-footer p {
		padding: 0 1em;
	}
}

@media screen and (max-width: 384px) {

	.container-w3layouts {
		padding: 3em 0 3em;
	}
	.home a {
		width: 24%;
	}
	.agileits-logo {
		padding: 1em;
	}
}
@media screen and (max-width: 320px) {
	h2.txt-wthree {
		font-size: 3.1em;
	}
}