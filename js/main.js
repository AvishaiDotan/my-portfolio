'use strict'

// Can it works without document
$(onInit)

function onInit() {
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

    $('.portfolio-link').click(onOpenModal)
    $('.close-modal').click(onCloseModal)
}

function onOpenModal() {

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

    $('.portfolio-modal').show()
}

function onCloseModal() {
    $(this).hide()
}

$('.toggle-btn-special').click(onToggleContactModal)
$('.open-btn-contact').click(onSendMail)

function onToggleContactModal() {
    
    const state = $(this).data('state')

    if (state === 'off') {
        $(this).data('state', 'on')
        $('.btn-special-icon').removeClass('fa-comment')
        $('.btn-special-icon').addClass('fa-comment-close')
    } else {
        $(this).data('state', 'off')
        $('.btn-special-icon').removeClass('fa-comment-close')
        $('.btn-special-icon').addClass('fa-comment')
    }
}

function onSendMail() {
    const emailAddress = $('.form-email').val()
    const subject = $('.form-subject').val()
    const message = $('.form-message').val()
    const file = $('.form-file').val()

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


