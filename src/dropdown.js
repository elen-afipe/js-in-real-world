// requires html elements with ".dropdown-toggle" and ".dropdown-menu" classes - siblings of each other; works with button click and closes on blur
const dropdownBtns = document.querySelectorAll(".dropdown-toggle");
export default function configureDropdowns(){
    dropdownBtns.forEach((dropdownBtn)=>{
        dropdownBtn.addEventListener("click", (event) =>{
            event.stopPropagation();
            const dropdownMenu = dropdownBtn.nextElementSibling;
            dropdownMenu.classList.toggle("active");
        })
    })
    document.addEventListener("click", (event)=> {
        event.stopPropagation();
        const openDropdownMenus = document.querySelectorAll(".dropdown-menu.active");
        openDropdownMenus.forEach((dropdownMenu)=>{
            const dropdownBtn = dropdownMenu.previousElementSibling;
            const clickIsInsideMenu = dropdownMenu.contains(event.target) || dropdownBtn.contains(event.target);
            if (!clickIsInsideMenu){
                dropdownMenu.classList.remove("active")
            }
        })
    })
}