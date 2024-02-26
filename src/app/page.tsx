"use client"
import { Button, ButtonGroup, Flex, FormLabel, Heading, Input, Radio, RadioGroup, Select, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { encAffine, decAffine } from "../utils/affine";
import { encPlayfair, decPlayfair } from "@/utils/playfair";
import { encVigenere, decVigenere } from "@/utils/vigenere";

const DEFAULT_BG_COLOR = '#ffffff';
const ALGO_LIST = ['Vigenere Cipher', 'Extended Vigenere Cipher', 'Autokey Vigenere Cipher', 'Playfair Cipher', 'Product Cipher', 'Affine Cipher']

export default function Home() {
  const [value, setValue] = useState('encrypt');
  const [algo, setAlgo] = useState<string>('');
  const [inputType, setInputType] = useState<string>('text');
  const [inputText, setInputText] = useState<string>('');
  const [key, setKey] = useState('');
  const [mKey, setMKey] = useState<number>(0);
  const [bKey, setBKey] = useState<number>(0);
  const [resultText, setResultText] = useState<String>('');

  const handleAlgoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgo(e.target.value);
  }

  const handleInputTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputType(e.target.value);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  }

  const handleEncrypt = () => {
    console.log(algo)
    if (algo == "Vigenere Cipher"){
      setResultText(encVigenere(inputText, key, 0))
    } else if (algo == "Autokey Vigenere Cipher"){
      setResultText(encVigenere(inputText, key, 1))
    } else if (algo == "Extended Vigenere Cipher"){
      setResultText(encVigenere(inputText, key, 2))
    } else if (algo == "Playfair Cipher"){
      setResultText(encPlayfair(inputText, key))
    } else if (algo == "Product Cipher"){
      setResultText("Product Cipher")
    } else if (algo == "Affine Cipher"){
      setResultText(encAffine(mKey, inputText, bKey))
    } else {
      setResultText("ERROR INPUT")
    }
  }

  const handleDecrypt = () => {
    console.log(algo)
    if (algo == "Vigenere Cipher"){
      setResultText(decVigenere(inputText, key, 0))
    } else if (algo == "Autokey Vigenere Cipher"){
      setResultText(decVigenere(inputText, key, 1))
    } else if (algo == "Extended Vigenere Cipher"){
      setResultText(decVigenere(inputText, key, 2))
    } else if (algo == "Playfair Cipher"){
      setResultText(decPlayfair(inputText, key))
    } else if (algo == "Product Cipher"){
      setResultText("Product Cipher")
    } else if (algo == "Affine Cipher"){
      setResultText(decAffine(mKey, inputText, bKey))
    } else {
      setResultText("ERROR INPUT")
    }
  }

  return (
    <Flex bgColor={'#f2f4f6'} minHeight={'100vh'} gap={8} flexDir={'column'} paddingTop={8} alignItems={'center'}>
      {value === 'encrypt' ? <Heading>En-Crypto</Heading> : <Heading>De-Crypto</Heading>}
      <Flex flexDir={'column'} width={{base:'80%', md:'70%'}} gap={4}>
        <Flex flexDir={'column'}>
          <FormLabel>Input Type</FormLabel>
          <Select bgColor={DEFAULT_BG_COLOR} onChange={(e) => handleInputTypeChange(e)}>
            <option value='text'>Text</option>
            <option value='file'>File</option>
          </Select>
        </Flex>
        
        {inputType === 'text' ?
        <Flex flexDir={'column'}>
          <FormLabel>Input Text</FormLabel>
          <Textarea
            placeholder="Enter text to encrypt or decrypt"
            bgColor={DEFAULT_BG_COLOR}
            height={'100px'}
            resize={'none'}
            onChange={(e) => handleInputChange(e)}
          />
        </Flex>
        :
        <Flex flexDir={'column'}>
          <FormLabel>Upload File</FormLabel>
          <Input type="file" bgColor={DEFAULT_BG_COLOR}/>
        </Flex>
        }

        <Flex flexDir={'column'}>
          <FormLabel>Cipher Algorithm</FormLabel>
          <Select placeholder="Select a cipher algorithm" bgColor={DEFAULT_BG_COLOR} onChange={(e) => handleAlgoChange(e)}>
            {ALGO_LIST.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </Select>
        </Flex>

        {algo === 'Affine Cipher' ?
          <Flex flexDir={'row'} gap={4} justifyContent={'space-between'}>
            <Flex flexDir={'column'} width={'100%'}>
              <FormLabel>M-Key</FormLabel>
              <Input placeholder="Enter a number that is relative prime to 26" bgColor={DEFAULT_BG_COLOR}/>
            </Flex>
            <Flex flexDir={'column'} width={'100%'}>
              <FormLabel>B-Key</FormLabel>
              <Input placeholder="Enter a number" bgColor={DEFAULT_BG_COLOR}/>
            </Flex>
          </Flex>
          : 
          <Flex flexDir={'column'}>
            <FormLabel>Key</FormLabel>
            <Input placeholder="Enter a key" bgColor={DEFAULT_BG_COLOR} onChange={(e) => setKey(e.target.value)}/>
          </Flex>
        }

        <RadioGroup onChange={setValue} value={value}>
          <Flex gap={4}>
            <Radio value="encrypt">Encrypt</Radio>
            <Radio value="decrypt">Decrypt</Radio>
          </Flex>
        </RadioGroup>
      </Flex>
      <ButtonGroup spacing={4}>
          {value === 'encrypt' ? <Button onClick={(e) => handleEncrypt()}>Encrypt</Button> : <Button onClick={(e) => handleDecrypt()}>Decrypt</Button>}
            <Button>Download File</Button>
      </ButtonGroup>

      {resultText !== '' ?
        <Flex flexDir={'column'} width={{base:'80%', md:'70%'}} paddingBottom={8}>
          <FormLabel>Result</FormLabel>
          <Flex bgColor={DEFAULT_BG_COLOR} height={'100px'} borderRadius={'6px'} border={'1px solid #e2e8f0'} paddingX={4} paddingY={2}>{resultText}</Flex>
        </Flex>
        : null
      }
    </Flex>
  );
}
