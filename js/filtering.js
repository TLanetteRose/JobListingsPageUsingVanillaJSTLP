import allData from './data.js';
import { renderData } from  './renderData.js';

export const activateSkills = () => {
    const $skills = document.querySelectorAll('.skill');

    $skills.forEach($skill => {
        $skill.addEventListener('click', e => {
            const skill = e.target.outText;
            const $header = document.querySelector('.header__container');
            const $tagsContainer = document.querySelector('.tags');

            if(!$tagsContainer){
                $header.innerHTML = `
                <ul class="tags">
                    <li class="tag">${skill}</li>
                </ul>`
                filterData();
                activateDeleteTags();
                return
            };

            const $tags = [...document.querySelectorAll('tag')]

            const isAlreadyThere = $tags.find($tag => {
                return $tag.textContent === skill;
            })

            if(isAlreadyThere){
                e.target.classList.add('btn-error')
                setTimeout(() => {
                    e.target.classList.remove('btn-error')
                }, 2000);
                return
            }

            const actualContent = $tagsContainer.innerHTML;
            $tagsContainer.innerHTML = `
                ${actualContent}
                <li class="tag">${skill}</li>
                `

                filterData();
                activateDeleteTags();
        })
    })
}


