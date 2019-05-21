import moment from 'moment'

export const state = () => ({
  fromValue: '1',
  toValue: '2',
  date: moment().format('YYYY-MM-DD'),
  time: moment().format('HH:mm')
})

export const mutations = {
  setFromValue(state, fromValue) {
    state.fromValue = fromValue
  },
  setToValue(state, toValue) {
    state.toValue = toValue
  },
  setDate(state, date) {
    state.date = date
  },
  setTime(state, time) {
    state.time = time
  }
}
