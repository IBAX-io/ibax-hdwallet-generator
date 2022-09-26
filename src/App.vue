<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import { handleWordsNum, handleReduce } from '@/plugins/util';
import keyring from '@/plugins/keyring';
import keccak256 from '@/plugins/keccak256';

interface interItem {
  id: number;
  path: string;
  privateKey: string;
  publicKey: string;
  ethAddress: string;
  ibaxAddress: string;
}
const wordsNum = handleWordsNum();
const num = ref('12');
const len = ref(128);
const textarea = ref('');
const tableData = reactive({ arr: [] as interItem[] });
const handleCommand = (command: string | number | object) => {
  console.log(command);
  len.value = Number(command)!;
  const obj = wordsNum.find((item) => item.command === command);
  num.value = obj!.label;
};
let i = 0;
let arr: interItem[] = [];
const handlePrivate = (value: string, index: number) => {
  const priavteKey = keyring.generatePriavte(value, index);
  return new Promise((resolve, reject) => {
    if (priavteKey) {
      const obj = {
        id: index,
        path: `m/44'/60'/0'/0/${index}`,
        privateKey: keyring.generatePriavte(value, index),
        publicKey: keccak256.generatePublicKey(
          keyring.generatePriavte(value, index)
        ),
        ethAddress: keyring.ethAddress(keyring.generatePriavte(value, index)),
        ibaxAddress: keccak256.generateAddres(
          keccak256.generatePublicKey(keyring.generatePriavte(value, index))
        )
      };
      resolve(obj);
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('error');
    }
  });
};
const handleGenerate = async (index: number) => {
  const { value } = textarea;
  const boo = keyring.verifyWords(value);
  console.log(boo);
  if (boo) {
    if (i <= 10) {
      // tableData.arr = [];
      const obj = (await handlePrivate(value, index)) as any;
      arr.push(obj);
      if (arr.length) {
        tableData.arr = handleReduce(arr);
      }
      i += 1;
      handleGenerate(i);
    } else {
      i = 0;
      return false;
    }
  } else {
    ElMessage({
      showClose: true,
      message: `Error in mnemonic words`,
      type: 'warning'
    });
  }
};
const handleTextarea = () => {
  if (textarea.value) {
    tableData.arr = [];
    arr = [];
    handleGenerate(0);
  }
};
const handleGenerateWords = () => {
  textarea.value = keyring.generateSeed(len.value);
  if (textarea.value) {
    tableData.arr = [];
    arr = [];
    handleGenerate(0);
  }
};
</script>

<template>
  <div class="container">
    <el-scrollbar>
      <el-row justify="center">
        <el-col :lg="21" :md="22" :ml="23">
          <div class="app">
            <h1 class="app-h1">Mnemonic Code Converter</h1>
            <div class="app-mnemonic">
              <div class="app-mnemonic-box">
                <span class="app-mnemonic-box-label">Mnemonic</span>
                <div class="app-mnemonic-box-content">
                  <div class="app-mnemonic-box-content-des">
                    <span>
                      You can enter an existing BIP39 mnemonic, or generate a
                      new random mnemonic. It is not feasible to input 12 words
                      at random, because these words need a specific structure
                      (the last word contains a checksum).
                    </span>
                    <a
                      href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
                      target="_blank"
                    >
                      BIP39 spec.
                    </a>
                  </div>
                  <div class="app-mnemonic-box-content-des app-mnemonic-layout">
                    <span>Generate random mnemonics:</span>
                    <el-dropdown @command="handleCommand">
                      <el-input
                        v-model="num"
                        placeholder="Pick a date"
                        :suffix-icon="ArrowDown"
                      />
                      <template #dropdown>
                        <el-dropdown-menu
                          v-for="item in wordsNum"
                          :key="item.label"
                        >
                          <el-dropdown-item :command="item.command">
                            {{ item.label }}
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                    <el-button
                      type="primary"
                      class="app-mnemonic-layout-btn"
                      @click="handleGenerateWords"
                    >
                      Generate
                    </el-button>
                  </div>
                </div>
              </div>
              <div class="app-mnemonic-box">
                <span class="app-mnemonic-box-label">BIP39 Mnemonics</span>
                <div class="app-mnemonic-box-content">
                  <el-input
                    v-model="textarea"
                    placeholder="Please mnemonic"
                    type="textarea"
                    rows="3"
                    clearable
                    @input="handleTextarea"
                  />
                </div>
              </div>
            </div>
            <h2 class="app-table-title">Derived Address</h2>
            <div class="app-table">
              <el-table :data="tableData.arr" stripe style="width: 100%">
                <el-table-column prop="path" label="Path" width="120" />
                <el-table-column label="Private Key" show-overflow-tooltip>
                  <template #default="scope">
                    <span>
                      {{ scope.row.privateKey }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="Public Key" show-overflow-tooltip>
                  <template #default="scope">
                    <span>
                      {{ scope.row.publicKey }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="ETH Address" show-overflow-tooltip>
                  <template #default="scope">
                    <span>
                      {{ scope.row.ethAddress }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="IBAX Address"
                  show-overflow-tooltip
                  width="180"
                >
                  <template #default="scope">
                    <span>
                      {{ scope.row.ibaxAddress }}
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>
