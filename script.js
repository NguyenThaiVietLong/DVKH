// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Ẩn tất cả các section và causes-menu khi trang web load
    const sections = document.querySelectorAll('.content-section');
    console.log(sections)
    
    const causeMenus = document.querySelectorAll('.causes-menu');
    
    sections.forEach(section => section.style.display = 'none');
    causeMenus.forEach(menu => menu.style.display = 'none');
    
    // Ẩn tất cả submenu ban đầu
    const submenus = document.querySelectorAll('.submenu');
    submenus.forEach(submenu => submenu.style.display = 'none');

   


    // Thêm event listener cho tất cả các menu items
    const menuItems = document.querySelectorAll('.menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const sectionId = this.getAttribute('data-section');
            console.log('Section ID:', sectionId)
            
        

            // Xử lý click vào issues
            if (sectionId) {
                const selectedSection = document.getElementById(sectionId);
                console.log('selectedSection:', selectedSection)
                const isVisible = selectedSection && selectedSection.style.display === 'block';
                // console.log(isVisible)

                // Đóng tab nếu nó đang mở
                if (isVisible) {
                    selectedSection.style.display = 'none';
                    // Ẩn tất cả causes menu trước
                    causeMenus.forEach(menu => menu.style.display = 'none');
                } else {
                    showContent(sectionId);         
                    
                    // Ẩn tất cả causes menu trước
                    causeMenus.forEach(menu => menu.style.display = 'none');
                    
                    // Nếu là facebook-issue hoặc youtube-issue, hiển thị causes menu tương ứng
                    if (['facebook-issue','connectwf-nointernet','no-connect','notseewifi-issue','wifi-bandwidth1','box-nopower1','box-nosignal1','box-nointernet1'].includes(sectionId)) {
                        // Ẩn tất cả causes menu trước
                        causeMenus.forEach(menu => menu.style.display = 'none');

                        const parentLi = this.closest('li');
                        const causesMenu = parentLi.querySelector('.causes-menu');

                        // Hiển thị causes menu tương ứng nếu tồn tại
                        if (causesMenu) {
                            causesMenu.style.display = 'block';
                        }
                    } 
                }
                
                // Toggle submenu nếu có
                const submenu = this.nextElementSibling;
                if (submenu && submenu.classList.contains('submenu')) {
                    // Nếu là wifi-slow hoặc wifi-cant-use, chỉ toggle submenu
                    if (['wifi-slow', 'wifi-cant-use', 'wifi-bandwidth','box-nopower','box-nosignal','box-nointernet' ].includes(sectionId)) {
                        // Ẩn tất cả submenu khác cùng cấp
                        const siblingSubmenus = this.closest('ul').querySelectorAll('.submenu');
                        siblingSubmenus.forEach(sub => {
                            if (sub !== submenu) sub.style.display = 'none';
                        });
                        // Toggle submenu hiện tại
                        submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
                    }
                }
            }
        });
    });
});

function showContent(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}