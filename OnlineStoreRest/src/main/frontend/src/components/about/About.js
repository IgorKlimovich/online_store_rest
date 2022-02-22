import './About.css'
import {NavLink} from "react-router-dom";

const About = () => {
    return (
        <div>
            <div className="container8">
                <div className="tit1">
                    <div>
                        <div>
                            <div className="my-shop">
                                <div><h1 className="title"><strong>My Shop -</strong></h1></div>
                                <div><h1 className="title ml-tit">Крупная</h1></div>
                            </div>
                        </div>
                        <div><h1 className="title">сеть магазинов бытовой</h1></div>
                        <div><h1 className="title">техники и электроники</h1></div>
                    </div>

                    <div className="img1">
                        <img src="https://avatars.mds.yandex.net/get-mpic/4944925/img_id8795490292869756874.jpeg/orig"
                             width="500"/>
                    </div>
                </div>
            </div>
            <div className="img2">
                <img src="https://pbs.twimg.com/profile_banners/1198117702776344586/1574754067/1500x500"
                width="1450"/>
            </div>
            <div className="title1">Наши предложения</div>
            <div className="feature">
                <div>
                    <ul>
                        <li className="feature-item">
                            <div className="feature-icon">
                                <img
                                    src="https://avatars.mds.yandex.net/i?id=cb33ba74e9d69d2bee24a4feaa2b6c84-5102997-images-thumbs&n=13"
                                    width="50" height="50"/>
                            </div>
                            <div>
                                Мобильный маркетплейс с поддержкой веб‑версии
                            </div>
                        </li>
                        <li className="feature-item">
                            <div className="feature-icon">
                                <img
                                    src="https://www.vippng.com/png/detail/104-1046604_shopping-cart-icon-shopping-cart-svg.png"
                                    width="50" height="50"/>
                            </div>
                            <div>
                                Общение между продавцами, покупателями и блогерами
                            </div>
                        </li>
                        <li className="feature-item">
                            <div className="feature-icon">
                                <img src="https://cdn.onlinewebfonts.com/svg/img_384101.png"
                                     width="50" height="50"/>
                            </div>
                            <div>
                                Персонализация товаров, скидок и предложений
                            </div>
                        </li>
                        <li className="feature-item">
                            <div className="feature-icon">
                                <img
                                    src="https://avatars.mds.yandex.net/i?id=a3f6eceb4c4521259a9cd06633a6f429-5239820-images-thumbs&n=13"
                                    width="50" height="50"/>
                            </div>
                            <div>
                                Качественная и надежная логистика
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="img3">
                    <img src="https://avatars.mds.yandex.net/get-mpic/4591438/img_id8846297699230866759.jpeg/orig"
                         width="500"/>
                </div>
            </div>
            <div className="title1">Наши вакансии</div>
            <div className="contact">
                <div className="contact-item">
                    <div className="cont-vac">
                        <div>
                            <div className="cont-text">Узнать как связаться
                            </div>
                            <br/>
                            <div className="cont-text">с нами вы можете
                            </div>
                            <br/>
                            <div className="cont-text">в разделе контакты
                            </div>
                        </div>
                        <div className="cont-btn">
                            <button className="btn-vac"><NavLink to="/contacts" className="ref-cont"
                            >Контакты</NavLink></button>
                        </div>
                    </div>
                    <div>
                        <img
                            src="https://st03.kakprosto.ru/images/article/2017/8/21/156955_599a85ad76f80599a85ad76fb9.jpeg"
                            width="650" className="photo"/>
                    </div>
                </div>
                <div className="con-photo">
                    <img src="https://www.marj3.com/wp-content/uploads/2018/07/beautiful-woman-business-people-2.jpg"
                         width="650"
                         className="photo"/>
                </div>
            </div>
        </div>

    )
}

export default About