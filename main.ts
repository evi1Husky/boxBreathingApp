const container = document.getElementById("container") as HTMLElement
const select = document.createElement("display-select") as DisplaySelect
const instructions = document.createElement("box-instructions")
select.setAttribute("selection", "box")
container.appendChild(instructions)
container.appendChild(select)
