import{_ as te,p as ie,s as se,u as ce,a as le}from"../@noble/@noble.4a211549.js";var m={},H={};(function(n){/*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */Object.defineProperty(n,"__esModule",{value:!0}),n.bytes=n.stringToBytes=n.str=n.bytesToString=n.hex=n.utf8=n.bech32m=n.bech32=n.base58check=n.base58xmr=n.base58xrp=n.base58flickr=n.base58=n.base64url=n.base64=n.base32crockford=n.base32hex=n.base32=n.base16=n.utils=n.assertNumber=void 0;function c(e){if(!Number.isSafeInteger(e))throw new Error(`Wrong integer: ${e}`)}n.assertNumber=c;function u(...e){const r=(a,t)=>s=>a(t(s)),o=Array.from(e).reverse().reduce((a,t)=>a?r(a,t.encode):t.encode,void 0),i=e.reduce((a,t)=>a?r(a,t.decode):t.decode,void 0);return{encode:o,decode:i}}function h(e){return{encode:r=>{if(!Array.isArray(r)||r.length&&typeof r[0]!="number")throw new Error("alphabet.encode input should be an array of numbers");return r.map(o=>{if(c(o),o<0||o>=e.length)throw new Error(`Digit index outside alphabet: ${o} (alphabet: ${e.length})`);return e[o]})},decode:r=>{if(!Array.isArray(r)||r.length&&typeof r[0]!="string")throw new Error("alphabet.decode input should be array of strings");return r.map(o=>{if(typeof o!="string")throw new Error(`alphabet.decode: not string element=${o}`);const i=e.indexOf(o);if(i===-1)throw new Error(`Unknown letter: "${o}". Allowed: ${e}`);return i})}}}function g(e=""){if(typeof e!="string")throw new Error("join separator should be string");return{encode:r=>{if(!Array.isArray(r)||r.length&&typeof r[0]!="string")throw new Error("join.encode input should be array of strings");for(let o of r)if(typeof o!="string")throw new Error(`join.encode: non-string input=${o}`);return r.join(e)},decode:r=>{if(typeof r!="string")throw new Error("join.decode input should be string");return r.split(e)}}}function v(e,r="="){if(c(e),typeof r!="string")throw new Error("padding chr should be string");return{encode(o){if(!Array.isArray(o)||o.length&&typeof o[0]!="string")throw new Error("padding.encode input should be array of strings");for(let i of o)if(typeof i!="string")throw new Error(`padding.encode: non-string input=${i}`);for(;o.length*e%8;)o.push(r);return o},decode(o){if(!Array.isArray(o)||o.length&&typeof o[0]!="string")throw new Error("padding.encode input should be array of strings");for(let a of o)if(typeof a!="string")throw new Error(`padding.decode: non-string input=${a}`);let i=o.length;if(i*e%8)throw new Error("Invalid padding: string should have whole number of bytes");for(;i>0&&o[i-1]===r;i--)if(!((i-1)*e%8))throw new Error("Invalid padding: string has too much padding");return o.slice(0,i)}}}function C(e){if(typeof e!="function")throw new Error("normalize fn should be function");return{encode:r=>r,decode:r=>e(r)}}function M(e,r,o){if(r<2)throw new Error(`convertRadix: wrong from=${r}, base cannot be less than 2`);if(o<2)throw new Error(`convertRadix: wrong to=${o}, base cannot be less than 2`);if(!Array.isArray(e))throw new Error("convertRadix: data should be array");if(!e.length)return[];let i=0;const a=[],t=Array.from(e);for(t.forEach(s=>{if(c(s),s<0||s>=r)throw new Error(`Wrong integer: ${s}`)});;){let s=0,p=!0;for(let d=i;d<t.length;d++){const x=t[d],l=r*s+x;if(!Number.isSafeInteger(l)||r*s/r!==s||l-x!==r*s)throw new Error("convertRadix: carry overflow");if(s=l%o,t[d]=Math.floor(l/o),!Number.isSafeInteger(t[d])||t[d]*o+s!==l)throw new Error("convertRadix: carry overflow");if(p)t[d]?p=!1:i=d;else continue}if(a.push(s),p)break}for(let s=0;s<e.length-1&&e[s]===0;s++)a.push(0);return a.reverse()}const R=(e,r)=>r?R(r,e%r):e,A=(e,r)=>e+(r-R(e,r));function T(e,r,o,i){if(!Array.isArray(e))throw new Error("convertRadix2: data should be array");if(r<=0||r>32)throw new Error(`convertRadix2: wrong from=${r}`);if(o<=0||o>32)throw new Error(`convertRadix2: wrong to=${o}`);if(A(r,o)>32)throw new Error(`convertRadix2: carry overflow from=${r} to=${o} carryBits=${A(r,o)}`);let a=0,t=0;const s=2**o-1,p=[];for(const d of e){if(c(d),d>=2**r)throw new Error(`convertRadix2: invalid data word=${d} from=${r}`);if(a=a<<r|d,t+r>32)throw new Error(`convertRadix2: carry overflow pos=${t} from=${r}`);for(t+=r;t>=o;t-=o)p.push((a>>t-o&s)>>>0);a&=2**t-1}if(a=a<<o-t&s,!i&&t>=r)throw new Error("Excess padding");if(!i&&a)throw new Error(`Non-zero padding: ${a}`);return i&&t>0&&p.push(a>>>0),p}function _(e){return c(e),{encode:r=>{if(!(r instanceof Uint8Array))throw new Error("radix.encode input should be Uint8Array");return M(Array.from(r),2**8,e)},decode:r=>{if(!Array.isArray(r)||r.length&&typeof r[0]!="number")throw new Error("radix.decode input should be array of strings");return Uint8Array.from(M(r,e,2**8))}}}function b(e,r=!1){if(c(e),e<=0||e>32)throw new Error("radix2: bits should be in (0..32]");if(A(8,e)>32||A(e,8)>32)throw new Error("radix2: carry overflow");return{encode:o=>{if(!(o instanceof Uint8Array))throw new Error("radix2.encode input should be Uint8Array");return T(Array.from(o),8,e,!r)},decode:o=>{if(!Array.isArray(o)||o.length&&typeof o[0]!="number")throw new Error("radix2.decode input should be array of strings");return Uint8Array.from(T(o,e,8,r))}}}function B(e){if(typeof e!="function")throw new Error("unsafeWrapper fn should be function");return function(...r){try{return e.apply(null,r)}catch{}}}function L(e,r){if(c(e),typeof r!="function")throw new Error("checksum fn should be function");return{encode(o){if(!(o instanceof Uint8Array))throw new Error("checksum.encode: input should be Uint8Array");const i=r(o).slice(0,e),a=new Uint8Array(o.length+e);return a.set(o),a.set(i,o.length),a},decode(o){if(!(o instanceof Uint8Array))throw new Error("checksum.decode: input should be Uint8Array");const i=o.slice(0,-e),a=r(i).slice(0,e),t=o.slice(-e);for(let s=0;s<e;s++)if(a[s]!==t[s])throw new Error("Invalid checksum");return i}}}n.utils={alphabet:h,chain:u,checksum:L,radix:_,radix2:b,join:g,padding:v},n.base16=u(b(4),h("0123456789ABCDEF"),g("")),n.base32=u(b(5),h("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"),v(5),g("")),n.base32hex=u(b(5),h("0123456789ABCDEFGHIJKLMNOPQRSTUV"),v(5),g("")),n.base32crockford=u(b(5),h("0123456789ABCDEFGHJKMNPQRSTVWXYZ"),g(""),C(e=>e.toUpperCase().replace(/O/g,"0").replace(/[IL]/g,"1"))),n.base64=u(b(6),h("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),v(6),g("")),n.base64url=u(b(6),h("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"),v(6),g(""));const z=e=>u(_(58),h(e),g(""));n.base58=z("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"),n.base58flickr=z("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"),n.base58xrp=z("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");const N=[0,2,3,5,6,7,9,10,11];n.base58xmr={encode(e){let r="";for(let o=0;o<e.length;o+=8){const i=e.subarray(o,o+8);r+=n.base58.encode(i).padStart(N[i.length],"1")}return r},decode(e){let r=[];for(let o=0;o<e.length;o+=11){const i=e.slice(o,o+11),a=N.indexOf(i.length),t=n.base58.decode(i);for(let s=0;s<t.length-a;s++)if(t[s]!==0)throw new Error("base58xmr: wrong padding");r=r.concat(Array.from(t.slice(t.length-a)))}return Uint8Array.from(r)}};const ne=e=>u(L(4,r=>e(e(r))),n.base58);n.base58check=ne;const $=u(h("qpzry9x8gf2tvdw0s3jn54khce6mua7l"),g("")),O=[996825010,642813549,513874426,1027748829,705979059];function k(e){const r=e>>25;let o=(e&33554431)<<5;for(let i=0;i<O.length;i++)(r>>i&1)===1&&(o^=O[i]);return o}function I(e,r,o=1){const i=e.length;let a=1;for(let t=0;t<i;t++){const s=e.charCodeAt(t);if(s<33||s>126)throw new Error(`Invalid prefix (${e})`);a=k(a)^s>>5}a=k(a);for(let t=0;t<i;t++)a=k(a)^e.charCodeAt(t)&31;for(let t of r)a=k(a)^t;for(let t=0;t<6;t++)a=k(a);return a^=o,$.encode(T([a%2**30],30,5,!1))}function W(e){const r=e==="bech32"?1:734539939,o=b(5),i=o.decode,a=o.encode,t=B(i);function s(l,f,y=90){if(typeof l!="string")throw new Error(`bech32.encode prefix should be string, not ${typeof l}`);if(!Array.isArray(f)||f.length&&typeof f[0]!="number")throw new Error(`bech32.encode words should be array of numbers, not ${typeof f}`);const w=l.length+7+f.length;if(y!==!1&&w>y)throw new TypeError(`Length ${w} exceeds limit ${y}`);return l=l.toLowerCase(),`${l}1${$.encode(f)}${I(l,f,r)}`}function p(l,f=90){if(typeof l!="string")throw new Error(`bech32.decode input should be string, not ${typeof l}`);if(l.length<8||f!==!1&&l.length>f)throw new TypeError(`Wrong string length: ${l.length} (${l}). Expected (8..${f})`);const y=l.toLowerCase();if(l!==y&&l!==l.toUpperCase())throw new Error("String must be lowercase or uppercase");l=y;const w=l.lastIndexOf("1");if(w===0||w===-1)throw new Error('Letter "1" must be present between prefix and data only');const P=l.slice(0,w),S=l.slice(w+1);if(S.length<6)throw new Error("Data must be at least 6 characters long");const F=$.decode(S).slice(0,-6),G=I(P,F,r);if(!S.endsWith(G))throw new Error(`Invalid checksum in ${l}: expected "${G}"`);return{prefix:P,words:F}}const d=B(p);function x(l){const{prefix:f,words:y}=p(l,!1);return{prefix:f,words:y,bytes:i(y)}}return{encode:s,decode:p,decodeToBytes:x,decodeUnsafe:d,fromWords:i,fromWordsUnsafe:t,toWords:a}}n.bech32=W("bech32"),n.bech32m=W("bech32m"),n.utf8={encode:e=>new TextDecoder().decode(e),decode:e=>new TextEncoder().encode(e)},n.hex=u(b(4),h("0123456789abcdef"),g(""),C(e=>{if(typeof e!="string"||e.length%2)throw new TypeError(`hex.decode: expected string, got ${typeof e} with length ${e.length}`);return e.toLowerCase()}));const E={utf8:n.utf8,hex:n.hex,base16:n.base16,base32:n.base32,base64:n.base64,base64url:n.base64url,base58:n.base58,base58xmr:n.base58xmr},D=`Invalid encoding type. Available types: ${Object.keys(E).join(", ")}`,oe=(e,r)=>{if(typeof e!="string"||!E.hasOwnProperty(e))throw new TypeError(D);if(!(r instanceof Uint8Array))throw new TypeError("bytesToString() expects Uint8Array");return E[e].encode(r)};n.bytesToString=oe,n.str=n.bytesToString;const ae=(e,r)=>{if(!E.hasOwnProperty(e))throw new TypeError(D);if(typeof r!="string")throw new TypeError("stringToBytes() expects string");return E[e].decode(r)};n.stringToBytes=ae,n.bytes=n.stringToBytes})(H);Object.defineProperty(m,"__esModule",{value:!0});m.mnemonicToSeedSync=m.mnemonicToSeed=be=m.validateMnemonic=m.entropyToMnemonic=m.mnemonicToEntropy=me=m.generateMnemonic=void 0;/*! scure-bip39 - MIT License (c) 2022 Patricio Palladino, Paul Miller (paulmillr.com) */const K=te,J=ie,ue=le,Q=se,de=ce,j=H,he=n=>n[0]==="\u3042\u3044\u3053\u304F\u3057\u3093";function V(n){if(typeof n!="string")throw new TypeError(`Invalid mnemonic type: ${typeof n}`);return n.normalize("NFKD")}function q(n){const c=V(n),u=c.split(" ");if(![12,15,18,21,24].includes(u.length))throw new Error("Invalid mnemonic");return{nfkd:c,words:u}}function X(n){K.default.bytes(n,16,20,24,28,32)}function fe(n,c=128){if(K.default.number(c),c%32!==0||c>256)throw new TypeError("Invalid entropy");return ee((0,de.randomBytes)(c/8),n)}var me=m.generateMnemonic=fe;const pe=n=>{const c=8-n.length/4;return new Uint8Array([(0,ue.sha256)(n)[0]>>c<<c])};function Y(n){if(!Array.isArray(n)||n.length!==2**11||typeof n[0]!="string")throw new Error("Worlist: expected array of 2048 strings");return n.forEach(c=>{if(typeof c!="string")throw new Error(`Wordlist: non-string element: ${c}`)}),j.utils.chain(j.utils.checksum(1,pe),j.utils.radix2(11,!0),j.utils.alphabet(n))}function Z(n,c){const{words:u}=q(n),h=Y(c).decode(u);return X(h),h}m.mnemonicToEntropy=Z;function ee(n,c){return X(n),Y(c).encode(n).join(he(c)?"\u3000":" ")}m.entropyToMnemonic=ee;function ge(n,c){try{Z(n,c)}catch{return!1}return!0}var be=m.validateMnemonic=ge;const re=n=>V(`mnemonic${n}`);function ye(n,c=""){return(0,J.pbkdf2Async)(Q.sha512,q(n).nfkd,re(c),{c:2048,dkLen:64})}m.mnemonicToSeed=ye;function we(n,c=""){return(0,J.pbkdf2)(Q.sha512,q(n).nfkd,re(c),{c:2048,dkLen:64})}m.mnemonicToSeedSync=we;var U={};Object.defineProperty(U,"__esModule",{value:!0});var ve=U.wordlist=void 0;ve=U.wordlist=`abandon
ability
able
about
above
absent
absorb
abstract
absurd
abuse
access
accident
account
accuse
achieve
acid
acoustic
acquire
across
act
action
actor
actress
actual
adapt
add
addict
address
adjust
admit
adult
advance
advice
aerobic
affair
afford
afraid
again
age
agent
agree
ahead
aim
air
airport
aisle
alarm
album
alcohol
alert
alien
all
alley
allow
almost
alone
alpha
already
also
alter
always
amateur
amazing
among
amount
amused
analyst
anchor
ancient
anger
angle
angry
animal
ankle
announce
annual
another
answer
antenna
antique
anxiety
any
apart
apology
appear
apple
approve
april
arch
arctic
area
arena
argue
arm
armed
armor
army
around
arrange
arrest
arrive
arrow
art
artefact
artist
artwork
ask
aspect
assault
asset
assist
assume
asthma
athlete
atom
attack
attend
attitude
attract
auction
audit
august
aunt
author
auto
autumn
average
avocado
avoid
awake
aware
away
awesome
awful
awkward
axis
baby
bachelor
bacon
badge
bag
balance
balcony
ball
bamboo
banana
banner
bar
barely
bargain
barrel
base
basic
basket
battle
beach
bean
beauty
because
become
beef
before
begin
behave
behind
believe
below
belt
bench
benefit
best
betray
better
between
beyond
bicycle
bid
bike
bind
biology
bird
birth
bitter
black
blade
blame
blanket
blast
bleak
bless
blind
blood
blossom
blouse
blue
blur
blush
board
boat
body
boil
bomb
bone
bonus
book
boost
border
boring
borrow
boss
bottom
bounce
box
boy
bracket
brain
brand
brass
brave
bread
breeze
brick
bridge
brief
bright
bring
brisk
broccoli
broken
bronze
broom
brother
brown
brush
bubble
buddy
budget
buffalo
build
bulb
bulk
bullet
bundle
bunker
burden
burger
burst
bus
business
busy
butter
buyer
buzz
cabbage
cabin
cable
cactus
cage
cake
call
calm
camera
camp
can
canal
cancel
candy
cannon
canoe
canvas
canyon
capable
capital
captain
car
carbon
card
cargo
carpet
carry
cart
case
cash
casino
castle
casual
cat
catalog
catch
category
cattle
caught
cause
caution
cave
ceiling
celery
cement
census
century
cereal
certain
chair
chalk
champion
change
chaos
chapter
charge
chase
chat
cheap
check
cheese
chef
cherry
chest
chicken
chief
child
chimney
choice
choose
chronic
chuckle
chunk
churn
cigar
cinnamon
circle
citizen
city
civil
claim
clap
clarify
claw
clay
clean
clerk
clever
click
client
cliff
climb
clinic
clip
clock
clog
close
cloth
cloud
clown
club
clump
cluster
clutch
coach
coast
coconut
code
coffee
coil
coin
collect
color
column
combine
come
comfort
comic
common
company
concert
conduct
confirm
congress
connect
consider
control
convince
cook
cool
copper
copy
coral
core
corn
correct
cost
cotton
couch
country
couple
course
cousin
cover
coyote
crack
cradle
craft
cram
crane
crash
crater
crawl
crazy
cream
credit
creek
crew
cricket
crime
crisp
critic
crop
cross
crouch
crowd
crucial
cruel
cruise
crumble
crunch
crush
cry
crystal
cube
culture
cup
cupboard
curious
current
curtain
curve
cushion
custom
cute
cycle
dad
damage
damp
dance
danger
daring
dash
daughter
dawn
day
deal
debate
debris
decade
december
decide
decline
decorate
decrease
deer
defense
define
defy
degree
delay
deliver
demand
demise
denial
dentist
deny
depart
depend
deposit
depth
deputy
derive
describe
desert
design
desk
despair
destroy
detail
detect
develop
device
devote
diagram
dial
diamond
diary
dice
diesel
diet
differ
digital
dignity
dilemma
dinner
dinosaur
direct
dirt
disagree
discover
disease
dish
dismiss
disorder
display
distance
divert
divide
divorce
dizzy
doctor
document
dog
doll
dolphin
domain
donate
donkey
donor
door
dose
double
dove
draft
dragon
drama
drastic
draw
dream
dress
drift
drill
drink
drip
drive
drop
drum
dry
duck
dumb
dune
during
dust
dutch
duty
dwarf
dynamic
eager
eagle
early
earn
earth
easily
east
easy
echo
ecology
economy
edge
edit
educate
effort
egg
eight
either
elbow
elder
electric
elegant
element
elephant
elevator
elite
else
embark
embody
embrace
emerge
emotion
employ
empower
empty
enable
enact
end
endless
endorse
enemy
energy
enforce
engage
engine
enhance
enjoy
enlist
enough
enrich
enroll
ensure
enter
entire
entry
envelope
episode
equal
equip
era
erase
erode
erosion
error
erupt
escape
essay
essence
estate
eternal
ethics
evidence
evil
evoke
evolve
exact
example
excess
exchange
excite
exclude
excuse
execute
exercise
exhaust
exhibit
exile
exist
exit
exotic
expand
expect
expire
explain
expose
express
extend
extra
eye
eyebrow
fabric
face
faculty
fade
faint
faith
fall
false
fame
family
famous
fan
fancy
fantasy
farm
fashion
fat
fatal
father
fatigue
fault
favorite
feature
february
federal
fee
feed
feel
female
fence
festival
fetch
fever
few
fiber
fiction
field
figure
file
film
filter
final
find
fine
finger
finish
fire
firm
first
fiscal
fish
fit
fitness
fix
flag
flame
flash
flat
flavor
flee
flight
flip
float
flock
floor
flower
fluid
flush
fly
foam
focus
fog
foil
fold
follow
food
foot
force
forest
forget
fork
fortune
forum
forward
fossil
foster
found
fox
fragile
frame
frequent
fresh
friend
fringe
frog
front
frost
frown
frozen
fruit
fuel
fun
funny
furnace
fury
future
gadget
gain
galaxy
gallery
game
gap
garage
garbage
garden
garlic
garment
gas
gasp
gate
gather
gauge
gaze
general
genius
genre
gentle
genuine
gesture
ghost
giant
gift
giggle
ginger
giraffe
girl
give
glad
glance
glare
glass
glide
glimpse
globe
gloom
glory
glove
glow
glue
goat
goddess
gold
good
goose
gorilla
gospel
gossip
govern
gown
grab
grace
grain
grant
grape
grass
gravity
great
green
grid
grief
grit
grocery
group
grow
grunt
guard
guess
guide
guilt
guitar
gun
gym
habit
hair
half
hammer
hamster
hand
happy
harbor
hard
harsh
harvest
hat
have
hawk
hazard
head
health
heart
heavy
hedgehog
height
hello
helmet
help
hen
hero
hidden
high
hill
hint
hip
hire
history
hobby
hockey
hold
hole
holiday
hollow
home
honey
hood
hope
horn
horror
horse
hospital
host
hotel
hour
hover
hub
huge
human
humble
humor
hundred
hungry
hunt
hurdle
hurry
hurt
husband
hybrid
ice
icon
idea
identify
idle
ignore
ill
illegal
illness
image
imitate
immense
immune
impact
impose
improve
impulse
inch
include
income
increase
index
indicate
indoor
industry
infant
inflict
inform
inhale
inherit
initial
inject
injury
inmate
inner
innocent
input
inquiry
insane
insect
inside
inspire
install
intact
interest
into
invest
invite
involve
iron
island
isolate
issue
item
ivory
jacket
jaguar
jar
jazz
jealous
jeans
jelly
jewel
job
join
joke
journey
joy
judge
juice
jump
jungle
junior
junk
just
kangaroo
keen
keep
ketchup
key
kick
kid
kidney
kind
kingdom
kiss
kit
kitchen
kite
kitten
kiwi
knee
knife
knock
know
lab
label
labor
ladder
lady
lake
lamp
language
laptop
large
later
latin
laugh
laundry
lava
law
lawn
lawsuit
layer
lazy
leader
leaf
learn
leave
lecture
left
leg
legal
legend
leisure
lemon
lend
length
lens
leopard
lesson
letter
level
liar
liberty
library
license
life
lift
light
like
limb
limit
link
lion
liquid
list
little
live
lizard
load
loan
lobster
local
lock
logic
lonely
long
loop
lottery
loud
lounge
love
loyal
lucky
luggage
lumber
lunar
lunch
luxury
lyrics
machine
mad
magic
magnet
maid
mail
main
major
make
mammal
man
manage
mandate
mango
mansion
manual
maple
marble
march
margin
marine
market
marriage
mask
mass
master
match
material
math
matrix
matter
maximum
maze
meadow
mean
measure
meat
mechanic
medal
media
melody
melt
member
memory
mention
menu
mercy
merge
merit
merry
mesh
message
metal
method
middle
midnight
milk
million
mimic
mind
minimum
minor
minute
miracle
mirror
misery
miss
mistake
mix
mixed
mixture
mobile
model
modify
mom
moment
monitor
monkey
monster
month
moon
moral
more
morning
mosquito
mother
motion
motor
mountain
mouse
move
movie
much
muffin
mule
multiply
muscle
museum
mushroom
music
must
mutual
myself
mystery
myth
naive
name
napkin
narrow
nasty
nation
nature
near
neck
need
negative
neglect
neither
nephew
nerve
nest
net
network
neutral
never
news
next
nice
night
noble
noise
nominee
noodle
normal
north
nose
notable
note
nothing
notice
novel
now
nuclear
number
nurse
nut
oak
obey
object
oblige
obscure
observe
obtain
obvious
occur
ocean
october
odor
off
offer
office
often
oil
okay
old
olive
olympic
omit
once
one
onion
online
only
open
opera
opinion
oppose
option
orange
orbit
orchard
order
ordinary
organ
orient
original
orphan
ostrich
other
outdoor
outer
output
outside
oval
oven
over
own
owner
oxygen
oyster
ozone
pact
paddle
page
pair
palace
palm
panda
panel
panic
panther
paper
parade
parent
park
parrot
party
pass
patch
path
patient
patrol
pattern
pause
pave
payment
peace
peanut
pear
peasant
pelican
pen
penalty
pencil
people
pepper
perfect
permit
person
pet
phone
photo
phrase
physical
piano
picnic
picture
piece
pig
pigeon
pill
pilot
pink
pioneer
pipe
pistol
pitch
pizza
place
planet
plastic
plate
play
please
pledge
pluck
plug
plunge
poem
poet
point
polar
pole
police
pond
pony
pool
popular
portion
position
possible
post
potato
pottery
poverty
powder
power
practice
praise
predict
prefer
prepare
present
pretty
prevent
price
pride
primary
print
priority
prison
private
prize
problem
process
produce
profit
program
project
promote
proof
property
prosper
protect
proud
provide
public
pudding
pull
pulp
pulse
pumpkin
punch
pupil
puppy
purchase
purity
purpose
purse
push
put
puzzle
pyramid
quality
quantum
quarter
question
quick
quit
quiz
quote
rabbit
raccoon
race
rack
radar
radio
rail
rain
raise
rally
ramp
ranch
random
range
rapid
rare
rate
rather
raven
raw
razor
ready
real
reason
rebel
rebuild
recall
receive
recipe
record
recycle
reduce
reflect
reform
refuse
region
regret
regular
reject
relax
release
relief
rely
remain
remember
remind
remove
render
renew
rent
reopen
repair
repeat
replace
report
require
rescue
resemble
resist
resource
response
result
retire
retreat
return
reunion
reveal
review
reward
rhythm
rib
ribbon
rice
rich
ride
ridge
rifle
right
rigid
ring
riot
ripple
risk
ritual
rival
river
road
roast
robot
robust
rocket
romance
roof
rookie
room
rose
rotate
rough
round
route
royal
rubber
rude
rug
rule
run
runway
rural
sad
saddle
sadness
safe
sail
salad
salmon
salon
salt
salute
same
sample
sand
satisfy
satoshi
sauce
sausage
save
say
scale
scan
scare
scatter
scene
scheme
school
science
scissors
scorpion
scout
scrap
screen
script
scrub
sea
search
season
seat
second
secret
section
security
seed
seek
segment
select
sell
seminar
senior
sense
sentence
series
service
session
settle
setup
seven
shadow
shaft
shallow
share
shed
shell
sheriff
shield
shift
shine
ship
shiver
shock
shoe
shoot
shop
short
shoulder
shove
shrimp
shrug
shuffle
shy
sibling
sick
side
siege
sight
sign
silent
silk
silly
silver
similar
simple
since
sing
siren
sister
situate
six
size
skate
sketch
ski
skill
skin
skirt
skull
slab
slam
sleep
slender
slice
slide
slight
slim
slogan
slot
slow
slush
small
smart
smile
smoke
smooth
snack
snake
snap
sniff
snow
soap
soccer
social
sock
soda
soft
solar
soldier
solid
solution
solve
someone
song
soon
sorry
sort
soul
sound
soup
source
south
space
spare
spatial
spawn
speak
special
speed
spell
spend
sphere
spice
spider
spike
spin
spirit
split
spoil
sponsor
spoon
sport
spot
spray
spread
spring
spy
square
squeeze
squirrel
stable
stadium
staff
stage
stairs
stamp
stand
start
state
stay
steak
steel
stem
step
stereo
stick
still
sting
stock
stomach
stone
stool
story
stove
strategy
street
strike
strong
struggle
student
stuff
stumble
style
subject
submit
subway
success
such
sudden
suffer
sugar
suggest
suit
summer
sun
sunny
sunset
super
supply
supreme
sure
surface
surge
surprise
surround
survey
suspect
sustain
swallow
swamp
swap
swarm
swear
sweet
swift
swim
swing
switch
sword
symbol
symptom
syrup
system
table
tackle
tag
tail
talent
talk
tank
tape
target
task
taste
tattoo
taxi
teach
team
tell
ten
tenant
tennis
tent
term
test
text
thank
that
theme
then
theory
there
they
thing
this
thought
three
thrive
throw
thumb
thunder
ticket
tide
tiger
tilt
timber
time
tiny
tip
tired
tissue
title
toast
tobacco
today
toddler
toe
together
toilet
token
tomato
tomorrow
tone
tongue
tonight
tool
tooth
top
topic
topple
torch
tornado
tortoise
toss
total
tourist
toward
tower
town
toy
track
trade
traffic
tragic
train
transfer
trap
trash
travel
tray
treat
tree
trend
trial
tribe
trick
trigger
trim
trip
trophy
trouble
truck
true
truly
trumpet
trust
truth
try
tube
tuition
tumble
tuna
tunnel
turkey
turn
turtle
twelve
twenty
twice
twin
twist
two
type
typical
ugly
umbrella
unable
unaware
uncle
uncover
under
undo
unfair
unfold
unhappy
uniform
unique
unit
universe
unknown
unlock
until
unusual
unveil
update
upgrade
uphold
upon
upper
upset
urban
urge
usage
use
used
useful
useless
usual
utility
vacant
vacuum
vague
valid
valley
valve
van
vanish
vapor
various
vast
vault
vehicle
velvet
vendor
venture
venue
verb
verify
version
very
vessel
veteran
viable
vibrant
vicious
victory
video
view
village
vintage
violin
virtual
virus
visa
visit
visual
vital
vivid
vocal
voice
void
volcano
volume
vote
voyage
wage
wagon
wait
walk
wall
walnut
want
warfare
warm
warrior
wash
wasp
waste
water
wave
way
wealth
weapon
wear
weasel
weather
web
wedding
weekend
weird
welcome
west
wet
whale
what
wheat
wheel
when
where
whip
whisper
wide
width
wife
wild
will
win
window
wine
wing
wink
winner
winter
wire
wisdom
wise
wish
witness
wolf
woman
wonder
wood
wool
word
work
world
worry
worth
wrap
wreck
wrestle
wrist
write
wrong
yard
year
yellow
you
young
youth
zebra
zero
zone
zoo`.split(`
`);export{me as g,be as v,ve as w};