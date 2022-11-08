import { Center, Text, Icon } from 'native-base'
import { useAuth } from '../src/hooks/useAuth'
import { Button } from '../components/Button'
import Logo from '../src/assets/logo.svg'
import { Fontisto } from '@expo/vector-icons'

export function SignIn(){

  const {signIn, user} = useAuth();

    return (
      <Center flex={1} bgColor="gray.900" p={7}>
        <Logo width={212} height={40}/>

        <Button 
          title='ENTRAR COM GOOGLE'
          type='SECUNDARY'
          leftIcon={<Icon as={Fontisto} name='google' color='white' size='md'/>}
          mt={12}
          onPress={signIn}
        />

        <Text fontSize={12} color='white' textAlign='center' mt={4}>
          Não utilizamos nenhuma informação além {'\n'}
          do seu e-mail para criação de sua conta.
        </Text>
      </Center>
    )
}