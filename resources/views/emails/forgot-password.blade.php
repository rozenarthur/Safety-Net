<h1>Hello, {{$user->first_name}}</h1>

<p>Your password reset request has been approved.</p>
<p>Please click the following link to reset your password:

    <a href="{{env('APP_URL')}}/reset/{{$user->email}}/{{$code}}">Reset Password</a>
</p>

<p>Sincerely,</p>
<br>
<p>Foo Bar Software</p>