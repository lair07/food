/*jshint esversion: 8 */
function tabs (tabsSelector, tabsContentSelector, tabsParentSelector, activClass) {
    let tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove(activClass);
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add(activClass);
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains(tabsSelector.slice(1))) { // slice тк бращаемся не к '.tabheader__item' а к тому же только без точки поэтому ее нужно убрать с помощью слайс
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
	});
}
export default tabs;