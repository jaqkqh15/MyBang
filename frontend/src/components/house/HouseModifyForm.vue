<template>
	<v-container>
		<v-stepper v-model="e5">
			<form @submit.prevent="onSubmit">
				<v-stepper-step color="secondary" :complete="e5 > 1" step="1">
					중개사무소 정보
				</v-stepper-step>
				
				<v-stepper-content step="1">
					<v-card class="mb-5 pa-5" width="500" flat>

						<span>중개사 주소</span>
						<div class="d-flex">
							<v-text-field v-model="agentAddress" required solo class="mt-3" @change="changeAgentAddr"></v-text-field>
							<v-btn v-if="!completeAgentAddr" class="mt-5 ml-3 secondary" @click="onApiAgentAddress">확인</v-btn>
							<v-btn v-else class="mt-5 ml-3 secondary--text" @click="onApiAgentAddress" icon>
								<v-icon>check</v-icon>
							</v-btn>
						</div>

						<span>중개사 이메일</span>
						<v-text-field v-model="agentEmail" required solo class="mt-3"></v-text-field>
						
						<span>중개사 이름</span>
						<v-text-field v-model="agentName" required solo class="mt-3"></v-text-field>  

						<span>중개사 연락처</span>
						<v-text-field v-model="agentPhone" required solo class="mt-3"></v-text-field>

						<span>중개인 이름</span>
						<v-text-field v-model="userName" required solo class="mt-3"></v-text-field>

						<span>중개인 연락처</span>
						<v-text-field v-model="agentMobile" required solo class="mt-3"></v-text-field>
					</v-card>

					<v-btn class="my-3" color="secondary" @click="e5 = 2" :disabled="!completeAgentAddr">다음</v-btn>
				</v-stepper-content>


				<v-stepper-step color="secondary" :complete="e5 > 2" step="2">
					매물 입력사항(1)
				</v-stepper-step>

				<v-stepper-content step="2">
					<v-card class="mb-5 pa-5" width="500" flat>

						<span>매물의 주소</span>
						<div class="d-flex">
							<v-text-field v-model="address" required solo class="mt-3" @change="changeAddr"></v-text-field>
							<v-btn v-if="!completeAddr" class="mt-5 ml-3 secondary" @click="onApiAddress">확인</v-btn>
							<v-btn v-else class="mt-5 ml-3 secondary--text" @click="onApiAddress" icon>
								<v-icon>check</v-icon>
							</v-btn>
						</div>

						<span>시 / 구 / 동 (주소 입력시 자동으로 입력됩니다)</span>
						<div class="d-flex">
							<v-text-field v-model="local1" required solo class="mt-3 mr-3" readonly></v-text-field>
							<v-text-field v-model="local2" required solo class="mt-3 mr-3" readonly></v-text-field>
							<v-text-field v-model="local3" required solo class="mt-3" readonly></v-text-field>
						</div>

							<span>입주가능일</span>
								<div class="mx-1">
									<v-menu ref="menu" v-model="menu" :return-value.sync="date" 
										transition="scale-transition" offset-y min-width="auto">
										<template v-slot:activator="{ on }">
											<v-text-field  v-model="moveinDate" v-on="on" 
												append-icon="mdi-calendar" required solo class="mt-3"></v-text-field>
										</template>
										<v-date-picker color="secondary" v-model="moveinDate" no-title scrollable>
											<v-btn text @click="menu = false">Cancel</v-btn>
											<v-spacer></v-spacer>
											<v-btn text @click="$refs.menu.save(date)">OK</v-btn>
										</v-date-picker>
									</v-menu>
								</div> 

							<span>방구조</span>
							<div class="mx-1">
								<v-select :items='roomTypes' v-model="roomType" required solo class="mt-3" ></v-select>
							</div> 

							<span>판매유형</span>
							<div class="mx-1">
								<v-select :items='salesTypes' v-model="salesType" required solo class="mt-3" ></v-select>
							</div> 

							<span>보증금</span>
							<div class="mx-1">
								<v-text-field input type="number" v-model="deposit" required solo class="mt-3"></v-text-field>
							</div>

							<span>월세</span>
							<div class="mx-1">
								<v-text-field input type="number" v-model="rent" required solo class="mt-3"></v-text-field>
							</div>
						</v-card>

						<v-btn class="mb-5" text @click="e5 = 2">이전</v-btn>
						<v-btn class="mb-5" color="secondary" @click="e5 = 3" :disabled="!completeAddr">다음</v-btn>
					</v-stepper-content>
				

				<v-stepper-step color="secondary" :complete="e5 > 3" step="3">
					매물 입력사항(2)
				</v-stepper-step>
				<v-stepper-content step="3">
					<v-card class="mb-5 pa-5" width="500" flat>
						<span>크기</span>
						<div class="d-flex">
							<v-text-field placeholder="방의 평수" v-model="size" required solo class="mt-3 mr-3" ></v-text-field>
							<v-text-field placeholder="m2" v-model="sizeM2" required solo class="mt-3" readonly></v-text-field>
						</div> 
						
						<span>관리비 포함 항목</span>
						<div class="mx-1 mt-3" >
							<input type="checkbox" value="전기세" v-model="manageCostIncChk">
								<label for="전기세" class="check">전기세</label>
							<input type="checkbox" value="수도" v-model="manageCostIncChk">
								<label for="수도" class="check">수도</label>
							<input type="checkbox" value="가스" v-model="manageCostIncChk">
								<label for="가스" class="check">가스</label>
						</div>
						<div class="mx-1 mb-7">
							<input type="checkbox" value="인터넷" v-model="manageCostIncChk">
								<label for="인터넷" class="check">인터넷</label>
							<input type="checkbox" value="TV" v-model="manageCostIncChk">
								<label for="TV">TV</label>
						</div>
						
						<span>관리비</span>
						<v-text-field label="만원" v-model="manageCost" required solo class="mt-3"></v-text-field>

						<span>옵션</span>
						<div class="mx-1 mt-3">
							<input type="checkbox" value="에어컨" v-model="optionsChk">
								<label for="에어컨" class="check">에어컨</label>
							<input type="checkbox" value="냉장고" v-model="optionsChk">
								<label for="냉장고" class="check">냉장고</label>
							<input type="checkbox" value="세탁기" v-model="optionsChk">
								<label for="세탁기" class="check">세탁기</label>
						</div>
						<div class="mx-1">
							<input type="checkbox" value="가스레인지" v-model="optionsChk">
								<label for="가스레인지" class="check">가스레인지</label>
							<input type="checkbox" value="인덕션" v-model="optionsChk">
								<label for="인덕션" class="check">인덕션</label>
							<input type="checkbox" value="전자레인지" v-model="optionsChk">
								<label for="전자레인지" class="check">전자레인지</label>
						</div>
						<div class="mx-1">							
							<input type="checkbox" value="옷장" v-model="optionsChk">
								<label for="옷장" class="check">옷장</label>
							<input type="checkbox" value="책상" v-model="optionsChk">
								<label for="책상" class="check">책상</label>
							<input type="checkbox" value="책장" v-model="optionsChk">
								<label for="책장" class="check">책장</label>
						</div>
						<div class="mx-1 mb-7">
							<input type="checkbox" value="침대" v-model="optionsChk">
								<label for="침대" class="check">침대</label>
							<input type="checkbox" value="싱크대" v-model="optionsChk">
								<label for="싱크대" class="check">싱크대</label>
							<input type="checkbox" value="신발장" v-model="optionsChk">
								<label for="신발장" >신발장</label>
						</div> 
						
						<span>반려동물</span>
						<div class="mx-1">
							<v-select :items='petcheck' placeholder="반려동물" v-model="pets" required solo class="mt-3"></v-select>
						</div> 

						<span>주차</span>
						<div class="mx-1">
							<v-select :items='parkings' placeholder="주차" v-model="parking" required solo class="mt-3"></v-select>
						</div>  
					</v-card>

					<v-btn class="mb-5" text @click="e5 = 2">이전</v-btn>		
					<v-btn class="mb-5" color="secondary" @click="e5 = 4">다음</v-btn>
				</v-stepper-content>
			
				<v-stepper-step color="secondary" :complete="e5 > 4" step="4">
					매물 입력사항(3)
				</v-stepper-step>
				
				<v-stepper-content step="4">
					<v-card class="mb-5 pa-5" width="500" flat>

						<span>인근 지하철</span>
						<v-text-field v-model="nearSubways" required solo class="mt-3"></v-text-field>
				
						<span>엘리베이터</span>
						<v-select :items='exist' v-model="elevator" required solo class="mt-3"></v-select> 

						<span>층수</span>
						<div class="d-flex">
							<v-select :items='floorCheck' placeholder="총 층수" v-model="floorAll" required solo class="mt-3 mr-3"></v-select>
							<v-select :items='floorCheck' placeholder="해당 층" v-model="floor" required solo class="mt-3"></v-select>
						</div>

						<span>방향</span>
						<v-select :items='roomDirections' v-model="roomDirection" required solo class="mt-3"></v-select>
	 				</v-card>

					<v-btn class="mb-5" text @click="e5 = 3">이전</v-btn>
					<v-btn class="mb-5" color="secondary" @click="e5 = 5">다음</v-btn>
				</v-stepper-content>
				
				<v-stepper-step color="secondary" step="5">
					매물 입력사항(4)
				</v-stepper-step>

				<v-stepper-content step="5">
					<v-card class="mb-5 pa-5" width="500" flat> 

						<span>소개글</span>
						<v-text-field placeholder="매물에 관한 내용을 100자 이내로 적어주세요" v-model="title" required solo class="mt-3"></v-text-field>

                        <span>건물사진 등록건물사진 등록 (없으면 그냥 확인버튼)</span>
							<v-card flat>
								
								<v-file-input class="mt-3" v-model="files" @change="selectImg" label="사진 선택"
								chips multiple required solo ></v-file-input>

								<v-card class="mx-10" flat>
									<v-img v-for="url in urls" :key="url.index" class="ml-10" :src="url" width="50%"/>
								</v-card>

								<v-card-actions>
									<v-spacer></v-spacer>
									<v-progress-circular v-if="delayImage" indeterminate color="secondary"></v-progress-circular>
									<div v-else>
										<v-btn v-if="!completeImage" @click="checkImage" class="mt-5 ml-3 secondary">확인</v-btn>
										<v-btn v-else class="mt-5 ml-3 secondary--text" icon>
											<v-icon>check</v-icon>
										</v-btn>
									</div>

								</v-card-actions>
							
							</v-card>
                            
						<span>매물 상세설명</span>
						<v-textarea placeholder="매물에 관한 내용을 상세히 적어주세요" v-model="description" required solo class="mt-3"></v-textarea>
					</v-card>

					<v-btn class="mb-5" text @click="e5 = 4">이전</v-btn>
					<v-btn class="mb-5" color="secondary" type="submit" @click="onSubmit" :disabled="!completeImage">등록</v-btn>

				</v-stepper-content>
					
					<!-- 자동으로 입력되는 부분 --> 
					<div class="mx-3" hidden> 
							<v-icon color="black" size="30px">label</v-icon>
							중개사무소 좌표
							<div class="mx-1">
									<v-text-field placeholder="" v-model="agentLat" required solo class="mt-3" readonly></v-text-field>
							</div> 
					</div>
					<div class="mx-3" hidden> 
							<v-icon color="black" size="30px">label</v-icon>
							중개사무소 좌표
							<div class="mx-1">
									<v-text-field placeholder="" v-model="agentLng" required solo class="mt-3" readonly></v-text-field>
							</div> 
					</div>
					<div class="mx-3" hidden> 
							<v-icon color="black" size="30px">label</v-icon>
							좌표(lat)
							<div class="mx-1">
									<v-text-field placeholder="좌표(lat)" v-model="lat" required solo class="mt-3" readonly></v-text-field>
							</div> 
					</div>
					<div class="mx-3" hidden> 
							<v-icon color="black" size="30px">label</v-icon>
							좌표(lng)
							<div class="mx-1">
									<v-text-field placeholder="좌표(lng)" v-model="lng" required solo class="mt-3" readonly></v-text-field>
							</div> 
					</div>
					<div class="mx-3" hidden> 
							<v-icon color="black" size="30px">label</v-icon>
							작성자
							<div class="mx-1">
									<v-text-field placeholder="" v-model="agentId" required solo class="mt-3" readonly></v-text-field>
							</div> 
					</div>
	
			</form>
		</v-stepper>
	</v-container>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: 'HouseModifyForm',
    props: {
        house: {
            type: Object,
            required: true
        }
    },
    data () {
      return {
            e5: 1,
            image: null,
            rent: '',
            deposit: '',
            roomType: '',
            manageCost: '',
            manageCostInc: '',
            size: '',
            floorAll: '',
            floor: '',
            roomDirection: '',
            options: '',
            pets: '',
            parking: '',
            elevator: '',
            moveinDate: '',
            title: '',
            description: '',
            nearSubways: '',
            address: '',
            salesType: '',
            agentAddress: '',
            agentEmail: '',
            agentLat: '',
            agentLng: '',
            agentMobile: '',
            agentName: '',
            agentPhone: '',
            buildingType: '',
            lat: '',
            lng: '',
            local1: '',
            local2: '',
            local3: '',
            serviceType: '',
            userIntro: '',
            userName: '',
            url: '',
            updatedAt: '',
            agentId: '',
            menu: false,
            date: null,
            manageCostIncChk: [],
            optionsChk: [],
            viewImage: null,
            files: [],
            urls: [],
            imageStr: '',
            floorCheck:['1층', '2층', '3층', '4층', '5층', '6층','7층', '8층', '9층', '10층', '11층','12층','13층','14층','15층','16층','17층','18층','19층','20층',
                        '21층','22층','23층','24층','25층','26층','27층','28층','29층','30층','31층','32층','33층','34층','35층','36층','37층','38층','39층','40층',
                        '50층'],
            roomTypes: ['오픈형 원룸(방1)','분리형 원룸(방1 거실1)','복층형 원룸', '투룸(방2, 거실1)', '쓰리룸+'],
            salesTypes: ['월세','전세','매매'],
            exist: ['있음', '없음'],
            parkings: ['가능', '없음'],
            roomDirections: ['북향', '남향', '동향', '서향', '남동향', '남서향', '북동향', '북서향', '확인필요'],
            petcheck: ['가능', '불가능', '고양이만', '확인필요'],
            completeAgentAddr: true,
			completeAddr: true,
			completeImage: false,
			delayImage: false
        }
    },
    computed: {
        ...mapState(['userInfo']),
        sizeM2 () {
            return this.size * 3.305785
        }
    },
    created () {
        this.address = this.house.address
        this.agentAddress = this.house.agentAddress
        this.agentEmail = this.house.agentEmail
        this.agentLat = this.house.agentLat
        this.agentLng = this.house.agentLng
        this.agentMobile = this.house.agentMobile
        this.agentName = this.house.agentName
        this.agentPhone = this.house.agentPhone
        this.buildingType = this.house.buildingType
        this.deposit = this.house.deposit
        this.description = this.house.description
        this.elevator = this.house.elevator
        this.floor = this.house.floor
        this.floorAll = this.house.floorAll
        this.image = this.house.image
        this.lat = this.house.lat
        this.lng = this.house.lng
        this.local1 = this.house.local1
        this.local2 = this.house.local2
        this.local3 = this.house.local3
        this.manageCost = this.house.manageCost
        this.manageCostInc = this.house.manageCostInc
        this.moveinDate = this.house.moveinDate
        this.nearSubways = this.house.nearSubways
        this.options = this.house.options
        this.parking = this.house.parking
        this.pets = this.house.pets
        this.roomDirection = this.house.roomDirection
        this.roomType = this.house.roomType
        this.salesType = this.house.salesType
        this.serviceType = this.house.serviceType
        this.size = this.house.size
        this.sizeM2 = this.house.sizeM2
        this.title = this.house.title
        this.updatedAt = this.house.updatedAt
        this.userIntro = this.house.userIntro
        this.userName = this.house.userName
        this.url = this.house.url
        this.agentId = this.house.agentId
        this.rent = this.house.rent
    },
    mounted() {
        this.agentId = this.userInfo.userId
        if (this.$store.state.session != null) {
            this.isLogin = true
        }
    },
    methods: {
        selectImg () {
			try {
				this.urls = []
				this.imageStr = ''
				this.completeImage = false

				for (let i = 0; i < this.files.length; i++) {
					this.urls.push(URL.createObjectURL(this.files[i]))
				}

				this.sendImg()

			}catch(e) {
				this.urls = []
				this.imageStr = ''
				this.completeImage = false
			}
		},
		async sendImg() {
			const formData = new FormData()

			formData.set('key', 'ca442ada99076d1fda16e811a57f9d6d')

			this.delayImage = true

			for (let i = 0; i < this.files.length; i++) {
				formData.append('image', this.files[i])

				await axios.post(`https://api.imgbb.com/1/upload`, formData).then(res => {
					console.log(res.data.data.display_url)
					this.imageStr += res.data.data.display_url + ','
				})
			}
			this.delayImage = false
		},
		checkImage () {
			this.image = this.imageStr.slice(0, -1)
			console.log(this.image)

			this.completeImage = true
		},
		onSubmit () {
				this.agentId = this.userInfo.userId 
				const { image, rent, deposit, roomType, manageCost, manageCostIncChk, sizeM2, size, floorAll, floor, roomDirection, optionsChk, pets, parking, elevator, moveinDate, title, 
				description, nearSubways, address, salesType, agentAddress, agentEmail, agentLat, agentLng, agentMobile, agentName, agentPhone, buildingType,
				lat, lng, local1, local2, local3, serviceType, userIntro, userName, url, updatedAt, agentId } = this

				this.$emit('submit', { image, rent, deposit, roomType, manageCost, manageCostIncChk, sizeM2, size, floorAll, floor, roomDirection, optionsChk, pets, parking, elevator, moveinDate, title, 
				description, nearSubways, address, salesType, agentAddress, agentEmail, agentLat, agentLng, agentMobile, agentName, agentPhone, buildingType,
				lat, lng, local1, local2, local3, serviceType, userIntro, userName, url, updatedAt, agentId })
		},
		onDelete () {
			if (this.serviceType == '빌라') {
					const { villaNo } = this.house
					axios.delete(`http://localhost:7777/villa/${villaNo}`)
							.then(() => {
									alert("등록하신 매물이 삭제되었습니다")
									this.$router.push({name: 'SellerHouseListPage' })
							})
							.catch(err => {
									alert(err.response.data.message)
							})
			} else if (this.serviceType == '원룸') {
					const { oneroomNo } = this.house
					axios.delete(`http://localhost:7777/oneroom/${oneroomNo}`)
							.then(() => {
									alert("등록하신 매물이 삭제되었습니다")
									this.$router.push({name: 'SellerHouseListPage' })
							})
							.catch(err => {
									alert(err.response.data.message)
							})
			} else {
					const { officetelNo } = this.house
					axios.delete(`http://localhost:7777/officetel/${officetelNo}`)
							.then(() => {
									alert("등록하신 매물이 삭제되었습니다")
									this.$router.push({name: 'SellerHouseListPage' })
							})
							.catch(err => {
									alert(err.response.data.message)
							})
			}
				
		},
		onApiAddress () {
				axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${this.address}`,
				{ headers: { 'Authorization': 'KakaoAK ' + '005dda6eedb914e554e8810f970149d9' }}).then(res => {
						alert("입력성공")
						console.log(res.data)
				this.lat = res.data.documents[0].y
				this.lng = res.data.documents[0].x
				this.local1 = res.data.documents[0].road_address.region_1depth_name
				this.local2 = res.data.documents[0].road_address.region_2depth_name
				this.local3 = res.data.documents[0].road_address.region_3depth_name

				this.completeAddr = true
				})
		},
		onApiAgentAddress () {
				axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${this.agentAddress}`,
				{ headers: { 'Authorization': 'KakaoAK ' + '005dda6eedb914e554e8810f970149d9' }}).then(res => {
						alert("입력성공")
						console.log(res.data)
						this.agentLat = res.data.documents[0].y
						this.agentLng = res.data.documents[0].x

						this.completeAgentAddr = true
				})
		},
		changeAgentAddr () {
			this.completeAgentAddr = false
		},
		changeAddr () {
			this.completeAddr = false
		},
	},
    
}
</script>

<style scoped>

.button_place {
    left: 68%;
    margin-right: 1%;
    margin-top: -8%;
    /*margin-left: 135px;*/ 
}
.check {
    width: 93px;
    margin-right: 20px;
}
</style>
