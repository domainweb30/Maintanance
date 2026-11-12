// Data contoh peralatan dan riwayat. Ganti dengan data asli Anda.
const T=new Date();T.setHours(0,0,0,0);
const fmt=x=>x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0');
const off=n=>{const x=new Date(T);x.setDate(x.getDate()+n);return fmt(x)};
const EQ=[
['GRD-001','Mesin Panel Saw','Altendorf F45','2018','Cutting','Gedung A'],
['GRD-002','Mesin Edgebanding','Homag KAL 210','2019','Cutting','Gedung A'],
['GRD-003','CNC Router','Biesse Rover A','2021','Cutting','Gedung A'],
['GRD-004','Mesin Amplas Lebar','Heesemann','2017','Finishing','Gedung B'],
['GRD-005','Kompresor Udara','Atlas Copco GA30','2016','Utilitas','Ruang Mesin'],
['GRD-006','Spray Booth','Cefla SB-4','2020','Finishing','Gedung B'],
['GRD-007','Dust Collector','Donaldson Torit','2018','Utilitas','Gedung A'],
['GRD-008','Mesin Bor Multi Spindle','Weeke BHX','2019','Assembly','Gedung C'],
['GRD-009','Staple Gun Pneumatik','Meite 7116','2022','Upholstery','Gedung C']
].map(a=>({k:a[0],n:a[1],m:a[2],y:a[3],d:a[4],l:a[5]}));
const L=(k,o,j,c,a,s,p,h,n)=>({k,t:off(o),j,c,a,s,p,h,n:off(n)});
const SEED=[
L('GRD-001',-155,'PM','Jadwal rutin','Pelumasan rel, cek sabuk','Grease 100g','Budi','Normal',-95),
L('GRD-001',-98,'CM','Hasil potong tidak lurus','Setel ulang guide, ganti bearing','Bearing 6204','Andi','Normal',-35),
L('GRD-001',-35,'PM','Jadwal rutin','Cek mata gergaji, pembersihan','-','Budi','Normal',25),
L('GRD-002',-150,'PM','Jadwal rutin','Bersihkan unit lem dan pisau','Pisau trimming','Candra','Normal',-90),
L('GRD-002',-120,'CM','Lem tidak merata','Ganti heater lem','Heater 220V','Andi','Normal',-60),
L('GRD-002',-88,'PM','Jadwal rutin','Cek suhu dan pembersihan','-','Candra','Normal',-3),
L('GRD-003',-110,'PM','Jadwal rutin','Kalibrasi sumbu, pelumasan','Oli spindle','Andi','Normal',-50),
L('GRD-003',-70,'CM','Spindle bergetar','Ganti collet','Collet ER32','Andi','Normal',-10),
L('GRD-003',-42,'CM','Error sensor sumbu Z','Ganti limit switch','Limit switch','Dedi','Normal',-10),
L('GRD-003',-20,'CM','Spindle panas berlebih','Bongkar spindle, menunggu bearing','Bearing spindle','Andi','Perbaikan',4),
L('GRD-004',-140,'PM','Jadwal rutin','Ganti amplas belt','Amplas belt 120','Budi','Normal',-80),
L('GRD-004',-60,'PM','Jadwal rutin','Ganti belt, cek konveyor','Belt konveyor','Budi','Normal',2),
L('GRD-005',-130,'PM','Jadwal rutin','Ganti filter udara','Filter udara','Dedi','Normal',-70),
L('GRD-005',-70,'PM','Jadwal rutin','Ganti oli kompresor','Oli kompresor 5L','Dedi','Normal',-10),
L('GRD-005',-10,'PM','Jadwal rutin','Cek tekanan, buang kondensat','-','Dedi','Normal',50),
L('GRD-006',-170,'PM','Jadwal rutin','Bersihkan nozzle dan ducting','-','Candra','Normal',-110),
L('GRD-006',-125,'CM','Filter jebol, hasil semprot berdebu','Ganti filter booth','Filter booth','Candra','Normal',-95),
L('GRD-006',-95,'CM','Pompa cat bocor','Ganti seal pompa','Seal pompa','Andi','Normal',-12),
L('GRD-007',-100,'PM','Jadwal rutin','Bersihkan kantong debu','-','Dedi','Normal',-45),
L('GRD-007',-45,'CM','Motor kipas berisik','Ganti bearing motor','Bearing 6306','Dedi','Normal',-15),
L('GRD-007',-15,'PM','Jadwal rutin','Cek kantong debu dan belt','-','Budi','Normal',30),
L('GRD-008',-105,'PM','Jadwal rutin','Pelumasan spindle bor','Grease 100g','Budi','Normal',-45),
L('GRD-008',-45,'PM','Jadwal rutin','Cek mata bor, pelumasan','Mata bor 8mm','Budi','Normal',15),
L('GRD-009',-80,'PM','Jadwal rutin','Pelumasan, cek selang angin','Oli pneumatik','Candra','Normal',-5),
L('GRD-009',-5,'CM','Staple macet','Bersihkan dan ganti pegas','Pegas driver','Candra','Normal',40)
];
