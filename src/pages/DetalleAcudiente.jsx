

export default function  DetalleAcudiente ({cedula, nombre,  apellido,  correo, celular, direccion,  ingreso}) {

    
    return (
        <tr>
        <td>{cedula} </td>
        <td>{nombre} </td>
        <td>{apellido} </td>
        <td>{correo} </td>
        <td>{celular} </td>
        <td>{direccion} </td>
        <td>{ingreso} </td>
    
        <td className="container-button">
        <button className="edit-button ancho">Editar</button>
        <button className="delete-button ancho">Eliminar</button>
        </td>
    </tr>
       
    )
}