import costosModel from '../../models/costos/costosModel.js';
import unidadesModel from '../../models/unidades/unidadesModel.js';

// Crear una nueva empresa
const createCosts = async (req, res) => {
  const { va_valor_adquisicion, ve_horas_vida, cll_cantidad_llantas, vll_valor_llantas, hv_vida_economica_llantas, cc_cantidad_cadenas, vc_valor_cadenas, hc_vida_economica_cadenas, fi_precio_filtro_hora, ha_horas_efectivas_trabajo_anual, sa_salario_operacional, h_horas_trabajadas_maquina, to_turno_operacion, hr_horas_totales_maquina, ka_calculo_experimental, q_coeficiente_experimental, c_combustible_hora_trabajo, pc_precio_combustible, a_aceite_horas_trabajo, pi_precio_aceite, cah_cantidad_aceite_hidraulico, pah_precio_aceite_hidraulico, cmf_cantidad_mando_final, pmf_precio_aceite_mando_final, cg_cantidad_grasa, pg_precio_grasa, ia_interes_anual, modelo, operacion_operacion_o } = req.body;

  try {
    
      if (
        va_valor_adquisicion == null ||
        ve_horas_vida == null ||
        cll_cantidad_llantas == null ||
        vll_valor_llantas == null ||
        hv_vida_economica_llantas == null ||
        cc_cantidad_cadenas == null ||
        vc_valor_cadenas == null ||
        hc_vida_economica_cadenas == null ||
        fi_precio_filtro_hora == null ||
        ha_horas_efectivas_trabajo_anual == null ||
        sa_salario_operacional == null ||
        h_horas_trabajadas_maquina == null ||
        to_turno_operacion == null ||
        hr_horas_totales_maquina == null ||
        ka_calculo_experimental == null ||
        q_coeficiente_experimental == null ||
        c_combustible_hora_trabajo == null ||
        pc_precio_combustible == null ||
        a_aceite_horas_trabajo == null ||
        pi_precio_aceite == null ||
        cah_cantidad_aceite_hidraulico == null ||
        pah_precio_aceite_hidraulico == null ||
        cmf_cantidad_mando_final == null ||
        pmf_precio_aceite_mando_final == null ||
        cg_cantidad_grasa == null ||
        pg_precio_grasa == null ||
        ia_interes_anual == null ||
        modelo == null ||
        operacion_operacion_o == null
      ) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }
      

    let unidad = await unidadesModel.findOne({
      where: {
        modelo_tipo: modelo,
      },
    });

    if(!unidad) {
      return res.status(404).json({ message: 'Unidad no encontrada' });
    }

    const costoNuevo = await costosModel.create({
        va_valor_adquisicion,
        ve_horas_vida,
        cll_cantidad_llantas,
        vll_valor_llantas,
        hv_vida_economica_llantas,
        cc_cantidad_cadenas,
        vc_valor_cadenas,
        hc_vida_economica_cadenas,
        fi_precio_filtro_hora,
        ha_horas_efectivas_trabajo_anual,
        sa_salario_operacional,
        h_horas_trabajadas_maquina,
        to_turno_operacion,
        hr_horas_totales_maquina,
        ka_calculo_experimental,
        q_coeficiente_experimental,
        c_combustible_hora_trabajo,
        pc_precio_combustible,
        a_aceite_horas_trabajo,
        pi_precio_aceite,
        cah_cantidad_aceite_hidraulico,
        pah_precio_aceite_hidraulico,
        cmf_cantidad_mando_final,
        pmf_precio_aceite_mando_final,
        cg_cantidad_grasa,
        pg_precio_grasa,
        ia_interes_anual,
        id_unidad: unidad.id_unidad,
        operacion_operacion_o,
    });

    res.status(201).json({ message: 'Información del costo creado exitosamente', user: costoNuevo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar la información del costo', error });
  }
};

// Obtener toda la información de la empresa
const getAllCosts = async (req, res) => {
  try {
    const costo = await costosModel.findAll({
      where: {
        status: true,
      }
    });
    res.json(costo);

    if (!costo) {
        return res.status(404).json({ message: 'Costo no encontrado' });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el costo', error });
  }
};

// Obtener la empresa por su ID
const getCostsById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const costo = await costosModel.findOne({
        where: {
          id_costo: id, // Verifica el ID
          status: true,  // Verifica que esté activa
        },
      });
  
      if (!costo) {
        return res.status(404).json({ message: 'Costo no encontrado' });
      }
  
      res.json(costo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el costo', error });
    }
};
  
// Actualizar un usuario
const updateCosts = async (req, res) => {
  const { id } = req.params;
  const { va_valor_adquisicion, ve_horas_vida, cll_cantidad_llantas, vll_valor_llantas, hv_vida_economica_llantas, cc_cantidad_cadenas, vc_valor_cadenas, hc_vida_economica_cadenas, fi_precio_filtro_hora, ha_horas_efectivas_trabajo_anual, sa_salario_operacional, h_horas_trabajadas_maquina, to_turno_operacion, hr_horas_totales_maquina, ka_calculo_experimental, q_coeficiente_experimental, c_combustible_hora_trabajo, pc_precio_combustible, a_aceite_horas_trabajo, pi_precio_aceite, cah_cantidad_aceite_hidraulico, pah_precio_aceite_hidraulico, cmf_cantidad_mando_final, pmf_precio_aceite_mando_final, cg_cantidad_grasa, pg_precio_grasa, ia_interes_anual, operacion_operacion_o } = req.body;

  try {
    const costo = await costosModel.findByPk(id);

    if (!costo) {
      return res.status(404).json({ message: 'Costo no encontrado' });
    }
    
    await costo.update(req.body);

    res.json({ message: 'Costo actualizado correctamente', costo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el costo', error });
  }
};

// Eliminar un usuario
const deleteCosts = async (req, res) => {
  const { id } = req.params;

  try {
    const costo = await costosModel.findByPk(id);
    if (!costo) {
      return res.status(404).json({ message: 'Costo no encontrado' });
    }

    await costo.update({ status: false});
    res.json({ message: 'Costo eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el costo', error });
  }
};

// Exportar todas las funciones como un objeto
export const costosController = {
  createCosts,
  getAllCosts,
  getCostsById,
  updateCosts,
  deleteCosts,
};
 