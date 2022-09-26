
import './styles.css';

type AlertProps = {
    type: 'error' | 'warning' | 'success',
    message: string
}

export default function Alert({ type, message}: AlertProps): JSX.Element{
    return (
        <p className="alert-container">{message}</p>
    )
}