import logo from '../assets/ilustracion-concepto-error-404.png'
import '../styles/NotFound.scss'

export const NotFound = () => {
  return (
    <div className='box-error'>
      <img className='imagen-error' src={logo} alt="Imagen busqueda no encontrada" />
      <h2 className='advice-error'> Algo salio mal, no encontre lo que buscabas, puedes intentarlo con otro busqueda</h2>
    </div>
  )
}