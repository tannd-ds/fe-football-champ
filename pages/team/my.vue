<script setup>
const router = useRouter();
const { value: cookie_usr_info } = useCookie('usr_info');
router.push(`/team/${cookie_usr_info.team_id}`);
</script>