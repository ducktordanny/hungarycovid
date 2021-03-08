#! /bin/bash

cd src
sass --watch App.scss App.css &

cd Containers
sass --watch Pages.scss Pages.css &

cd ../Components/Cards
sass --watch Cards.scss Cards.css &

cd ../Footer
sass --watch Footer.scss Footer.css &

cd ../Nav
sass --watch Nav.scss Nav.css &

wait