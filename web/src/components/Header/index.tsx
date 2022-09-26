import { Link } from 'react-router-dom';
import Logo from '../../assets/images/boltech.png'
import './styles.css';

type HeaderProps = {
    title: string;
    goBack: boolean;
}

export default function Header({ title, goBack }: HeaderProps):JSX.Element{
    return(
        <nav>
            <div className="header-nav-container">
                <div>
                    { goBack && (
                        <Link to={`/projects`} className="go-back-arrow">
                            &#129168;
                        </Link>
                    )}
                    <img src={Logo} alt="Boltech Logo" />
                </div>
                <div>
                    <h1>{title}</h1>
                </div>
            </div>
        </nav>
    )
}