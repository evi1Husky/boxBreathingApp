"use strict";
const container = document.getElementById("container");
const select = document.createElement("display-select");
const instructions = document.createElement("box-instructions");
select.setAttribute("selection", "box");
container.appendChild(instructions);
container.appendChild(select);
