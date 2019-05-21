<template>
  <a-locale-provider :locale="locale">
    <div class="container">
      <a-row type="flex">
        <a-col :xs="{ span: 4 }" :lg="{ span: 1 }" class="center">
          Z:
        </a-col>

        <a-col :xs="{ span: 20 }" :lg="{ span: 5 }">
          <a-select
            v-model="from"
            label-in-value
            full-width
            size="large"
            class="full-width"
            :options="stations"
          ></a-select>
        </a-col>

        <a-col class="center" :xs="{ span: 24 }" :lg="{ span: 1 }">
          <a-button
            shape="circle"
            class="swap-icon"
            icon="swap"
            @click="swap"
          />
        </a-col>

        <a-col :xs="{ span: 4 }" :lg="{ span: 1 }" class="center">
          Do:
        </a-col>
        <a-col :xs="{ span: 20 }" :lg="{ span: 5 }">
          <a-select
            v-model="to"
            label-in-value
            size="large"
            class="full-width"
            :options="stations"
          ></a-select>
        </a-col>
        <a-col :xs="{ span: 15 }" :lg="{ span: 5 }">
          <a-date-picker
            v-model="date"
            :allow-clear="false"
            format="LL"
            size="large"
            class="full-width"
          />
        </a-col>
        <a-col :xs="{ span: 8, offset: 1 }" :lg="{ span: 4 }">
          <a-time-picker
            v-model="time"
            format="HH:mm"
            :minute-step="10"
            :allow-empty="false"
            size="large"
            :open="open"
            class="full-width"
            @openChange="handleOpenChange"
          >
            <a-button slot="addon" type="primary" @click="handleClose">
              Ok
            </a-button>
          </a-time-picker>
        </a-col>
      </a-row>
    </div>
  </a-locale-provider>
</template>

<script>
import plPL from 'ant-design-vue/lib/locale-provider/pl_PL'
import moment from 'moment'
import stations from '../stations.json'

export default {
  data() {
    return {
      locale: plPL,
      open: false,
      stations: stations
    }
  },
  computed: {
    from: {
      get: function() {
        const { fromValue } = this.$store.state

        return this.stations.find(({ value }) => value === fromValue)
      },
      set: function({ key }) {
        this.$store.commit('setFromValue', key)
      }
    },
    to: {
      get: function() {
        const { toValue } = this.$store.state

        return this.stations.find(({ value }) => value === toValue)
      },
      set: function({ key }) {
        this.$store.commit('setToValue', key)
      }
    },
    date: {
      get: function() {
        return moment(this.$store.state.date, 'YYYY-MM-DD')
      },
      set: function(date) {
        this.$store.commit('setDate', date.format('YYYY-MM-DD'))
      }
    },
    time: {
      get: function() {
        return moment(this.$store.state.time, 'HH:mm')
      },
      set: function(time) {
        this.$store.commit('setTime', time.format('HH:mm'))
      }
    }
  },
  methods: {
    handleOpenChange(open) {
      this.open = open
    },
    handleClose() {
      this.open = false
    },
    swap: function() {
      const { fromValue, toValue } = this.$store.state

      this.$store.commit('setFromValue', toValue)
      this.$store.commit('setToValue', fromValue)
    }
  }
}
</script>

<style scoped>
.container {
  padding: 3%;
}

.full-width {
  width: 100%;
}

.swap-icon {
  font-size: 1.2em;
  margin: 0.4em;
  display: inline-block;
  vertical-align: middle;
}

.center {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
