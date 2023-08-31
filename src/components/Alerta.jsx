
const Alerta = ({ alerta }) => {
  return (
    <div className={`${alerta.error ? 'from-red-500 to-red-900' :
      'from-teal-500 to-teal-800'} bg-gradient-to-br font-bold text-center p-3 rounded-3xl uppercase
       text-white  text-sm my-10  `}>
      {alerta.msg}
    </div>
  )
}

export default Alerta