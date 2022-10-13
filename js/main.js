'use strict'

$(onInit)

function onInit() {
    renderProjs()
    $('.open-contact-modal-action').click(onChangeContactModalIcon)
    $('.contact-nav-link-action').click(onChangeContactModalIcon)
    $('.send-mail-action').click(onSendMail)
    $('.portfolio-link').click(onOpenProjModal)
    $('.close-modal').click(onCloseProjModal)
    $('.close-modal-btn').click(onCloseProjModal)
}

function renderProjs() {
    const projs = getProjs()

    var strHtmls = projs.map((proj, idx) => `
        <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-id="${proj.id}" data-idx="${idx}" data-toggle="modal" href="#portfolioModal${idx}">
            <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                    <i class="fa fa-plus fa-3x"></i>
                </div>
            </div>
            <img class="img-fluid" src="${proj.imgUrl}" alt="">
            </a>
                <div class="portfolio-caption">
                    <h4>${proj.name}</h4>
                <p class="text-muted">${proj.title}</p>
            </div>
        </div>
    `)

    var $elContainer = $('.portfolio-link-container')
    $elContainer.html(strHtmls)
}

function onOpenProjModal() {
    
    const projId = $(this).data().id
    const projIdx = $(this).data().idx

    const proj = getProjById(projId)


    $('.portfolio-modal').attr("id", 'portfolioModal' + projIdx)

    $('.proj-h2').text(proj.name)
    $('.modal-title').text(proj.title)
    $('.proj-img').attr('src', proj.imgUrl)
    $('.proj-a').attr('href', proj.url)
    $('.proj-desc').text(proj.desc)
    $('.proj-date').text(proj.uploadDate)
    $('.proj-category').text(proj.category)

    $('.modals-container').show()

}

function onCloseProjModal() {
    $('.modals-container').hide()
}

function onChangeContactModalIcon() {
    const isClose = $('.open-contact-modal-icon').hasClass('fa-comment')

    if (isClose) {
        $('.open-contact-modal-icon').removeClass('fa-comment')
        $('.open-contact-modal-icon').addClass('fa-comment-close')
    } else {
        $('.open-contact-modal-icon').removeClass('fa-comment-close')
        $('.open-contact-modal-icon').addClass('fa-comment')
    }
}

function onSendMail() {
    const emailAddress = $('.form-email').val()
    const subject = $('.form-subject').val()
    const message = $('.form-message').val()
    const file = $('.form-file').val()

    if (!emailAddress || !subject || !message) {
        $('.send-mail-action').addClass('shake')
        setTimeout(() => {$('.send-mail-action').removeClass('shake')}, 500)
        return
    }

    const windowAddress = `https://mail.google.com/mail/u/0/?fs=1&to=avishaidotan@gmail.com&su=${subject}&body=${message + '\n\tFrom: ' + emailAddress}&tf=cm`
    window.open(windowAddress)
    resetForm()
}

function resetForm() {
    $('.form-email').val('')
    $('.form-subject').val('')
    $('.form-message').val('')
    $('.form-file').val('')
}


