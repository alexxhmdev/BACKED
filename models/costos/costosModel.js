import { DataTypes } from 'sequelize';
import sequelize from '../../config/baseDatos.config.js';

const costosModel = sequelize.define('tabla_costos', {
  id_costos: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Genera automáticamente un UUID único
    allowNull: false,
    primaryKey: true,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: () => new Date().toISOString().split('T')[0], // Genera automáticamente solo la fecha
    validate: {
      isDate: true, // Validación de que sea una fecha
    },
  },  
  va_valor_adquisicion:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  ve_horas_vida:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  cll_cantidad_llantas:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  vll_valor_llantas:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  hv_vida_economica_llantas:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  cc_cantidad_cadenas:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  vc_valor_cadenas:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  hc_vida_economica_cadenas:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  fi_precio_filtro_hora:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  ha_horas_efectivas_trabajo_anual:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  sa_salario_operacional:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  h_horas_trabajadas_maquina:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  to_turno_operacion:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  hr_horas_totales_maquina:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  ka_calculo_experimental:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  q_coeficiente_experimental: {
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  c_combustible_hora_trabajo:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  pc_precio_combustible: {
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  a_aceite_horas_trabajo:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  pi_precio_aceite:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  cah_cantidad_aceite_hidraulico:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  pah_precio_aceite_hidraulico:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  cmf_cantidad_mando_final:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  pmf_precio_aceite_mando_final:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  cg_cantidad_grasa:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  pg_precio_grasa:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  ia_interes_anual:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  }, 

  porcentaje_vr:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    defaultValue: 0.10,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  }, 

  porcentaje_s:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    defaultValue: 0.10,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  }, 

  /*porcentaje_vr: {
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
    set(value) {
      this.setDataValue('porcentaje_vr', value / 100); // Guarda como decimal (ej. 0.10 en lugar de 10)
    },
  },
  porcentaje_s: {
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true,
    },
    set(value) {
      this.setDataValue('porcentaje_s', value / 100);
    },
  },*/

  vr_valor_rescate:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  }, 
  s_prima_anual:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  }, 
  d_depreciacion:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  depreciacion_calculada_cf:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  inversion_calculada_cf:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  inversion_calculada_cf:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  seguros_calculados_cf:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  almacenaje_calculado_cf:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  mantenimiento_calculado_cf:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  //////////////////////////

  combustible_consumo_c:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },
  
  llantas_consumo_c:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  cadenas_consumo_c:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  filtros_consumo_c:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  //////////////////////////
  
  aceite_de_motor_calculada_lubricantes_l:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  aceite_hidrahulico_calculada_lubricantes_l:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  aceite_mandos_finales_calculada_lubricantes_l:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  engrasados_calculada_lubricantes_l:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  //////////////////////////

  operacion_operacion_o:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  //////////////////////////

  total_cargos_fijos:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  total_consumos:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  total_lubricantes:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  total_operacion:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },

  costo_horario:{
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
    validate: {
      isDecimal: true, // Validación de que sea un decimal
    },
  },


  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // El estado inicial es activo
    allowNull: false, // No puede ser nulo
  },
    id_unidad: { // Clave foránea
    type: DataTypes.UUID,
    allowNull: false, // Es obligatorio
  },
}, {
  tableName: 'tabla_costos', // Nombre exacto de la tabla en la base de datos
  timestamps: true,  // Agrega automáticamente createdAt y updatedAt
});

costosModel.beforeCreate((instance) => {
  if (instance.va_valor_adquisicion !== null && instance.porcentaje_vr !== null) {
    instance.vr_valor_rescate = instance.va_valor_adquisicion * instance.porcentaje_vr;
  }

  if (instance.ia_interes_anual !== null && instance.porcentaje_s !== null) {
    instance.s_prima_anual = instance.ia_interes_anual * instance.porcentaje_s;
  }

  if (instance.va_valor_adquisicion !== null && instance.vr_valor_rescate !== null && instance.ve_horas_vida !== null) {
    instance.d_depreciacion = 
      (instance.va_valor_adquisicion - instance.vr_valor_rescate) / instance.ve_horas_vida;
  }

  if (instance.hr_horas_totales_maquina < 10000) {
    instance.depreciacion_calculada_cf = instance.d_depreciacion;
  } else {
    instance.depreciacion_calculada_cf = 0;
  }


}); 

export default costosModel;
