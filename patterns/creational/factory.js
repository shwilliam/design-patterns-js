/*
 * Factory Pattern
 * ===============
 *
 * A generic interface for creating objects
 *
 */

const createVehicle = options => {
  switch (options.vehicleType) {
    case 'car':
      return {doors: 4, color: 'silver', ...options}
    case 'truck':
      return {doors: 2, color: 'black', ...options}
  }
}

const pinkCar = createVehicle({
  vehicleType: 'car',
  color: 'pink',
})
