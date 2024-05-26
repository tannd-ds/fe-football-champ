<template>
  <div
    class="w-full p-4 bg-zinc-900 rounded-lg bg-opacity-80
        border border-zinc-800
        transition-all duration-200 ease-in-out"
  >
    <div class="w-full justify-between items-center grid grid-cols-11 select-none">
      <div class="ml-4 col-span-2 flex flex-col items-start class">
        <UModal 
          v-model="update_time"
          class="w-full"
        >
          <AppCard>
            <div class="flex flex-col gap-4">
              <div class="grid grid-cols-5 items-center">
                <div 
                  class="unset col-span-2 flex flex-col gap-1 justify-center items-center cursor-default"
                >
                  <LazyUAvatar 
                    :src="`http://localhost:8000/api/get_img/team__${match.team_1_url_image}`"
                    alt="team_1_logo" 
                    class="w-10 h-10"
                  />
                  <div class="w-full font-bold text-sm text-center truncate">{{ match.team_1_name }}</div>
                </div>

                <div class="font-bold col-span-1 text-center">VS</div>

                <div 
                  class="unset col-span-2 flex flex-col gap-1 justify-center items-center cursor-default"
                >
                  <LazyUAvatar 
                    :src="`http://localhost:8000/api/get_img/team__${match.team_2_url_image}`"
                    alt="team_1_logo" 
                    class="w-10 h-10"
                  />
                  <div class="w-full font-bold text-sm text-center truncate">{{ match.team_2_name }}</div>
                </div>
              </div>

              <UForm 
                :state="state"
                :validate="validate"
                @submit.prevent="handleSubmit"
              >
                <UFormGroup
                  label="Thời Gian"
                  name="date"
                >
                  <UInput
                    class="grow"
                    v-model="state.datetime"
                    type="datetime-local"
                  />
                </UFormGroup>

                <div class="flex justify-center">
                  <UButton
                    type="submit"
                    class="mt-4"
                    label="Cập Nhật"
                    @click.prevent="handleSubmit"
                  />
                </div>
              </UForm>
            </div>
          </AppCard>
        </UModal>

        <div 
          class="flex flex-col items-center disabled:cursor-default"
          :class="{ 'cursor-pointer': cookie_usr_info.role == 1 }"
          @click="open_update_modal"
        >
          <div
            v-if="state.date != '' && state.time != ''"
            class="flex flex-col items-center"
          >
            <span class="font-bold text-xl text-center">{{ props.match.time_only }}</span>
            <span class="text-zinc-400 text-sm">{{ props.match.date_only }}</span>
          </div>

          <CBadge v-else :data="{ color: 'red', text: 'Chưa Xếp' }" />
        </div>
      </div>

      <button 
        class="unset col-span-2 flex flex-col gap-1 justify-center items-center"
        :title="`Xem thông tin ${match.team_1_name}`"
        @click="router.push(`/team/${match.team_id_1}`)"
      >
        <LazyUAvatar 
          :src="`http://localhost:8000/api/get_img/team__${match.team_1_url_image}`"
          alt="team_1_logo" 
          class="w-10 h-10"
        />
        <div 
          class="w-full text-xs text-center truncate"
          :class="{'text-primary font-bold' : team_1_is_this_team()}"
        >
          {{ match.team_1_name }}
        </div>
      </button>

      <div class="font-bold col-span-1 text-center">VS</div>

      <button class="unset col-span-2 flex flex-col gap-1 justify-center items-center"
        :title="`Xem thông tin ${match.team_2_name}`"
        @click="router.push(`/team/${match.team_id_2}`)"
      >
        <LazyUAvatar 
          :src="`http://localhost:8000/api/get_img/team__${match.team_2_url_image}`"
          alt="team_1_logo" 
          class="w-10 h-10"
        />
        <div 
          class="w-full text-xs text-center truncate"
          :class="{'text-primary font-bold' : team_2_is_this_team()}"
        >
          {{ match.team_2_name }}
        </div>
      </button>

      <div class="col-span-3 flex justify-center">
        <CBadge 
          v-if="isMatchNotPassed(match.date)"
          :data="{ color: 'green', text: 'Sắp Diễn Ra' }" 
        />
        <span v-else class="font-bold font-lg">{{ match.team_1_score }} - {{ match.team_2_score }}</span>
      </div>

      <div class="flex col-span-1 justify-end items-center">
        <CMatchDropdown
          v-if="cookie_usr_info.role == 1"
          :match="match"
          @update-date="open_update_modal"
          @delete="() => emit('delete')"
        />

        <button 
          v-else
          class="unset text-sm text-zinc-200 flex gap-2 items-center"
          @click="router.push(`/match/${match.schedule_id}`)"
        >
          <span>Chi Tiết</span>
          <UIcon name="i-heroicons-chevron-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  match: Object,
})

const emit = defineEmits(['delete', 'update-match-date']);

const router = useRouter();
const toasts = useToast();
const { value: cookie_usr_info } = useCookie('usr_info');

const update_time = ref(false);
const state = ref({
  date: props.match.date ? props.match.date_only : '',
  time: props.match.date ? props.match.time_only : '',
  datetime: props.match.date,
});

const open_update_modal = () => {
  if (cookie_usr_info.role == 1) {
    state.value.date =  props.match.date ? props.match.date_only : '';
    state.value.time =  props.match.date ? props.match.time_only : '';
    state.value.datetime =  props.match.date;

    update_time.value = true;
  }
}

function isMatchNotPassed(time) {
  let match_time = new Date(time);
  let current_time = new Date();

  return match_time > current_time;
}

function team_1_is_this_team() {
  return cookie_usr_info.team_id == props.match.team_id_1;
}

function team_2_is_this_team() {
  return cookie_usr_info.team_id == props.match.team_id_2;
}

async function fetch_update_time() {
  const body = [{
    schedule_id: props.match.schedule_id,
    datetime: state.value.datetime,
  }];

  const { data: response } = await useFetch('http://localhost:8000/api/match/update_time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (response.value.code == 200) {
    toasts.add({
      title: 'Thành Công',
      description: 'Cập nhật thời gian trận đấu thành công',
      status: 'success',
    });

    // emit to parent component to update matches
    emit('update-match-date');

    // close modal
    update_time.value = false;
  } else {
    toasts.add({
      title: 'Thất Bại',
      description: 'Cập nhật thời gian trận đấu thất bại',
      status: 'error',
    });
  }

}

const handleSubmit = () => {
  fetch_update_time();
}

const validate = (state) => {
  let errors = [];

  if (state.datetime == '' || state.datetime == null) {
    errors.push({
      message: 'Chưa chọn thời gian',
      path: 'date'
    });
  } else {
    // check if the time is in range of season
    let match_time = new Date(state.datetime);
    let season_start = new Date(props.match.start_date);
    let season_end = new Date(props.match.end_date); 

    if (match_time < season_start || match_time > season_end) {
      errors.push({
        message: 'Thời gian không nằm trong thời gian diễn ra giải đấu',
        path: 'date'
      });
    }
  }

  return errors;
}



</script>