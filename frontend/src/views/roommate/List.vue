<template>

	<div class="list_wrap">
		<h1>룸메 구하기</h1>

		<table class="table table-hover">

			<thead>
				<tr>
					<th>번호</th>
					<th>제목</th>
					<th>작성자</th>
					<th>등록일</th>
					<th>조회</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="(b, index) in boardList" :key="index">
					<td>{{b.id}}</td>
					<td>
						<router-link :to="`/roommate/detail/${b.id}`">
							{{b.title}}
							<span>{{[b.comments.length]}}</span>
						</router-link>
					</td>
					<td>{{b.writerName}}</td>
					<td>{{b.createdDate}}</td>
					<td>{{b.count}}</td>
				</tr>
			</tbody>

		</table>

		<div class="btn_wrap">
			<b-button @click="onClickWriteBtn">글쓰기</b-button>
		</div>
<!--		<b-pagination aria-controls="my-table" align="center" first-class="first" prev-class="prev" next-class="next"-->
<!--          last-class="last"-->
<!--          v-model="currentPage" :total-rows="totalItems" :per-page="perPage"-->
<!--          @change="handlerPagenation">-->
<!--		</b-pagination>-->

	</div>

</template>

<script>
  import api from "../../api";
  // import dayjs from "dayjs";
  export default {
    name: "RoomMateList",
    async mounted() {
      await this.fetchRoomMateList();
    },
    data() {
      return {
        currentPage: 1, // 현재 페이지
        perPage: 10, // 페이지당 보여줄 갯수
        totalPage: '',
        totalItems: '',
        // bootstrap 'b-table' 필드 설정
        boardList: [],
      };
    },
    methods : {
      async fetchRoomMateList() {
        return await api.get('/roomMate/list')
          .then((res) => {
            this.boardList = res.data.reverse();
            console.log(this.boardList);
          }).catch((err) => {
	            console.log(err);
	            alert("게시글 목록 조회 오류");
		        });
      },

      rowClick(item) {
        this.$router.push({
	        name: `/roommate/detail/${item.id}`
        })
      },

      onClickWriteBtn() {
        this.$router.push({name: 'RoomMateCreate'});
      },
      async handlerPagenation(v) {
        this.currentPage = v;
        await this.fetchRoomMateList();
      }
    },

  }
</script>

<style scoped>


	.list_wrap {
		width: 1200px;
		/*height: 100vh;*/
		display: flex;
		flex-direction: column;
		/*justify-content: space-evenly;*/
		align-items: center;
		margin: 0 auto;
		/*border: 1px solid red;*/
		margin-top: 80px;
		padding-bottom: 80px;
		font-family: 'Gowun Dodum', sans-serif;
	}

	.v-application a {
		text-decoration: none;
		color: yellow;
		padding: 5px;
	}

	h1 {
		font-size: 33px;
		font-weight: bold;
		width: 100%;
		color: #000;
		font-family: 'Noto Sans KR', sans-serif;
	}

	/*테이블*/
	table {
		margin-top: 50px;
		width: 100%;
		/*table-layout: fixed;*/
		text-align: center;
		border-top: 1px solid #555;
		/*border-collapse: collapse;*/

	}

	table th, td {
		padding: 20px;
		/*border-bottom: 1px solid #444444;*/
	}

	table thead th {
		border-bottom:none;
		background-color: #f5f5f5;
	}

	table thead tr th:nth-child(1) {
		width: 7%;
	}

	table thead tr th:nth-child(2) {
		width: 63%;
	}

	table thead tr th:nth-child(3) {
		width: 10%;
	}

	table thead tr th:nth-child(4) {
		width: 13%;
	}

	table thead tr th:nth-child(5) {
		width: 7%;
	}

	tbody td {
		padding: 20px 0;
	}

	table tbody tr:last-child {
		border-bottom: 1px solid #555;

	}

	table tbody tr td:nth-child(2) {
		text-align: justify;

	}

	table tbody tr td:nth-child(2) a {
		color: #212529;
		display: block;
		padding: 0px 35px;
	}


	.btn_wrap {
		width: 100%;
	}

	.btn {
		float: right;
	}

	/*b-button {*/
	/*	width: 90px;*/
	/*	height: 35px;*/
	/*	color: #555;*/
	/*	background-color: rgb(222, 221, 221);*/
	/*	border: none;*/
	/*	border-radius: 5px;*/
	/*	font-size: 18px;*/
	/*	line-height: 35px;*/
	/*	text-align: center;*/
	/*	font-family: 'Gowun Dodum', sans-serif;*/
	/*}*/

	.pagination {
		margin-top: 50px;
	}

	.page-item .page-link {
		color: red;
	}


</style>
