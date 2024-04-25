<template>
  <AppForm class="w-[600px] h-[4/5vh]">
    <template #header>
      <div class="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover" style='background-image: url("https://i.ibb.co/FWggPq1/banner.png");'>
        <div 
          v-if="soccer_info.team"
          class="absolute top-2 left-2 flex gap-2 items-center"
        >
          <LazyUAvatar 
            class="flex items-center justify-center rounded-full bg-primary"
            :src="`http://localhost:8000/api/get_img/team__${soccer_info.team.url_image}`" 
            :alt="soccer_info.team.name_team"
          />
          <span class="text-base font-bold text-zinc-800">{{ soccer_info.team.name_team }}</span>
        </div>
        <div class="absolute -bottom-12 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
          <LazyUAvatar 
            :src="`http://localhost:8000/api/get_img/soccer__${soccer_info.url_image}`" 
            size="3xl"
            :alt="soccer_info.name_soccer"
          />
        </div>
      </div>
      <div class="mt-16 flex flex-col items-center">
        <h4 class="text-xl font-bold">{{ soccer_info.name_soccer }}</h4>
        <p v-if="soccer_info.team" class="text-base font-normal">{{ soccer_info.team.name_team }}</p>
        <p v-else class="text-base font-normal">Cầu thủ Tự do</p>
      </div>
      <div class="mt-6 mb-3 flex gap-4 md:!gap-14 justify-center">
        <div class="flex flex-col items-center justify-center">
          <h3 class="text-2xl font-bold">{{ 2024 - parseInt(String(soccer_info.birthday).split('-')[0]) }}</h3>
          <p class="text-sm font-normal">Tuổi</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <h3 class="text-2xl font-bold">{{ soccer_info.total_goal }}</h3>
          <p class="text-sm font-normal">Bàn Thắng</p>
        </div>
      </div>
    </template>

    <template #main>
      <div class="px-6 pt-4">
        <div class="pb-1 font-bold text-lg">Tiểu Sử Cầu Thủ</div>
        <div class="indent-2 font-light text-zinc-300 leading-7 text-justify space-y-2">
          <p>
            <span class="font-bold">{{ soccer_info.name_soccer }}</span> là một cầu thủ bóng đá chuyên nghiệp, 
            sinh ngày {{ soccer_info.birthday }} tại Việt Nam. 
            Anh hiện đang thi đấu cho {{ soccer_info.team ? soccer_info.team.name_team : 'Cầu thủ tự do' }} 
            và ghi được tổng cộng {{ soccer_info.total_goal }} bàn thắng.
          </p>
          <p>
            <span class="font-bold">{{ soccer_info.name_soccer }}</span> là một cầu thủ rất tài năng và được rất nhiều đội bóng lớn trên thế giới săn đón. 
            Cầu thủ này không chỉ là một người chơi bóng đá tài năng, mà còn là biểu tượng của sự kiên trì và nỗ lực không ngừng. 
            Với tinh thần quyết tâm và lòng đam mê bóng đá mãnh liệt, anh ta đã vượt qua mọi thách thức để trở thành một trong 
            những người xuất sắc nhất trong làng túc cầu. Không chỉ là một cầu thủ xuất sắc trên sân cỏ, anh ta còn là một người 
            đồng đội đáng tin cậy và một tấm gương lý tưởng cho các cầu thủ trẻ. Với kỹ năng và tài năng vượt trội, anh ta luôn là 
            điểm tựa không thể thiếu của đội bóng, mang lại sức mạnh và sự tự tin cho toàn đội. 
          </p>
        </div>
      </div>
    </template>
  </AppForm>
</template>

<script setup>

const route = useRoute();
const router = useRouter();

const PAGE_TITLE = 'Chi Tiết Cầu Thủ';

let soccer_info = ref({});
let response = await useFetch(`http://localhost:8000/api/soccer/get/${route.params.id}`);

soccer_info = response.data.value;
</script>