import './Contacts.css'
const Contacts = ()=>{

    return(

        <div className="contacts">
            <div><h1>Контакты</h1></div>
            <div className="sales"><h2>Отдел продаж My Shop</h2></div>
            <div>
                <div className="one-numb">
                    <img
                        src="https://avatars.mds.yandex.net/i?id=e2cf6b249bd608e208f9d582b09aaf99-4570182-images-thumbs&n=13"
                        width="30" height="30"/>
                        <h2 className="one-number">0000</h2>
                        <h4 className="single-num">-единый мобильный номер для всех сотовых операторов</h4>
                </div>
                <div className="calls">
                    <h4 >звонок для абонентов МТС бесплатный, для абонентов А1 15 коп/мин, для абонентов Лайф 6 коп/мин</h4>
                </div>
                <div>
                    <div className="phone-cont phone-cont-mar">
                        <div className="phone">
                            <img src="https://shoppingnord.at/wp-content/uploads/2018/10/A1.jpg"
                                 width="20" height="20"/>
                                <h4 className="number">+375 00 000-00-00</h4>
                        </div>
                        <div className="phone">
                            <img
                                src="https://w7.pngwing.com/pngs/484/833/png-transparent-lifesize-bideokonferentzia-videotelephony-meeting-skype-for-business-life-text-logo-room.png"
                                width="20" height="20"/>
                                <h4 className="number">+375 00 000-00-00</h4>
                        </div>
                        <div className="phone">
                            <img
                                src="https://avatars.mds.yandex.net/i?id=8bdce0a6c784b45dfa23dd2f5dc25455-5460185-images-thumbs&n=13"
                                width="20" height="20"/>
                                <h4 className="number">+375 00 000-00-00</h4>
                        </div>
                    </div>
                    <div className="phone-cont">
                        <div className="phone">
                            <img
                                src="https://img2.freepng.ru/20180414/clq/kisspng-mts-minsk-mobile-phones-service-satellite-televisi-comedy-5ad1e161cc60c2.1764548615237041618371.jpg"
                                width="20" height="20"/>
                                <h4 className="number">+375 00 000-00-00</h4>
                        </div>
                        <div className="phone">
                            <img src="https://i.comss.pics/2020/12/06/btk0055.jpg"
                                 width="20" height="20"/>
                                <h4 className="number">+375 00 000-00-00</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3>Режим работы Контакт-центра:</h3>
                <h3 className="from">С 08.00 до 22.00 без выходных</h3>
            </div>
            <div>
                <div className="emails">
                    <img
                        src="https://avatars.mds.yandex.net/i?id=eece9fb751c275cb3db558042a00f4c5-5501896-images-thumbs&n=13"
                        width="20" height="20"/>
                        <h3 className="email email-marg">info@MyShop.nk</h3>
                </div>
                <div className="email-div">
                    <h3 className="email">beznal@MyShop.nk - покупка юридическими организациями</h3>
                </div>
                <div className="email-div">
                    <h3 className="email">price@MyShop.nk - по вопросам сотрудничества и снабжения</h3>
                </div>
                <div className="email-div">
                    <h3 className="email">reklamacii@MyShop.nk - по вопросам гарантии</h3>
                </div>
            </div>
            <div>
                <h3 >Присоединяйтесь к нам</h3>
            </div>
            <div className="socials">
                <div className="social">
                    <a href="#">
                        <img
                            src="https://avatars.mds.yandex.net/i?id=51149a3ea7d012221f4a1dd832fb4197-5859794-images-thumbs&n=13"
                            width="20" height="20"/>
                    </a>
                </div>
                <div className="social">
                    <a href="#">
                        <img
                            src="https://avatars.mds.yandex.net/i?id=926b2debdd88a89f5d61074e7d3bddae-4026981-images-thumbs&n=13"
                            width="20" height="20"/>
                    </a>
                </div>
                <div className="social">
                    <a href="#">
                        <img
                            src="https://avatars.mds.yandex.net/i?id=30e5f6e816a5d239cd1d9a8bcad99525-5859751-images-thumbs&n=13"
                            width="20" height="20"/>
                    </a>
                </div>
                <div className="social">
                    <a href="#">
                        <img
                            src="https://avatars.mds.yandex.net/i?id=dea80dedbda20bb913ec59bd330bd523-5581143-images-thumbs&n=13"
                            width="20" height="20"/>
                    </a>
                </div>
                <div className="social">
                    <a href="#">
                        <img
                            src="https://avatars.mds.yandex.net/i?id=693ebc3758c99a63d68589447e66c54f-4055751-images-thumbs&n=13"
                            width="20" height="20"/>
                    </a>
                </div>
            </div>
            <div>
                <h3 className="personal">Личный прием руководителем осуществляется ежемесячно каждый второй вторник месяца с 15.00 до 17.00 по адресу ул. Улица 1</h3>
            </div>
            <div>
                <h3  className="registration-for">Запись на личный прием осуществляется по телефонам +375000000000, +375000000000, +375000000000 (МТС, А1, Life)</h3>
            </div>
        </div>
    )
}

export default Contacts